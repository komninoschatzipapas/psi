import { Command, flags } from '@oclif/command';
import { readFileSync } from 'fs';
import { Lexer } from 'lexer';
import { Parser } from 'parser';
import { Interpreter } from 'interpreter';
import { SymbolBuilder, TypeChecker } from 'semantic-analyzer';
import { BaseSymbolScope } from 'symbol';
import { RunnableChain } from 'ast';
import injectLibraryToScope from 'library';
import PSIError from 'error';
import chalk from 'chalk';
import cli from 'cli-ux';
import { basename } from 'path';

function formatError(sourceCode: string, fileName: string, error: PSIError) {
  const header =
    chalk.bold(
      fileName +
        (error.start.linePosition !== -1 && error.start.characterPosition !== -1
          ? `:${error.start.linePosition}:${error.start.characterPosition}:`
          : ':') +
        ' ' +
        chalk.redBright('Error:') +
        ' ' +
        error.message,
    ) + '\n\n';

  let codeLine = '';

  if (
    error.start.characterPosition === -1 ||
    error.start.linePosition === -1 ||
    error.end.characterPosition === -1 ||
    error.end.linePosition === -1
  ) {
    codeLine = '<No line information was included>';
  } else if (error.start.linePosition === error.end.linePosition) {
    codeLine =
      sourceCode.split('\n')[error.start.linePosition - 1] +
      '\n' +
      ' '.repeat(error.start.characterPosition) +
      chalk.bold(
        chalk.blueBright(
          `^`.repeat(
            error.end.characterPosition - error.start.characterPosition || 1,
          ),
        ),
      );
  } else {
    codeLine =
      sourceCode.split('\n')[error.start.linePosition - 1] +
      '\n' +
      ' '.repeat(error.start.characterPosition) +
      chalk.bold(chalk.blueBright(`^`));
  }

  return header + codeLine + '\n';
}

class Psi extends Command {
  static description = 'Interpret Pascal code';

  static flags = {
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' }),
  };

  static args = [
    {
      name: 'file',
      required: false,
      description: 'Input file path',
    },
  ];

  async run() {
    const { args, flags } = this.parse(Psi);

    let file: string = args.file;

    if (!file) {
      file = await cli.prompt('Please specify the file to interpret:');
    }

    let sourceCode = '';
    try {
      sourceCode = readFileSync(file, 'utf8');
    } catch (error) {
      console.error(
        'An error occured while attempting to read the source code file.\nPlease ensure the correct file path was provided and the appropriate permissions were set.\nError code: ' +
          error.code,
      );
      process.exit(1);
    }
    try {
      const lexer = new Lexer(sourceCode);
      const tree = new Parser(lexer).run();
      const baseScope = new BaseSymbolScope('root');
      injectLibraryToScope(baseScope);
      new RunnableChain(
        new SymbolBuilder(tree, baseScope),
        new TypeChecker(tree, baseScope),
      ).run();
      const interpreter = new Interpreter(tree, baseScope);
      interpreter.run();
      // console.log(
      //   (interpreter.scope.children as any).values().next().value.value,
      // );
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }

      console.error(formatError(sourceCode, basename(file), error));

      console.error('Program execution halted with error(s).');

      process.exit(1);
    }
  }
}

export = Psi;
