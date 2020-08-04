import { Command, flags } from '@oclif/command';
import { readFileSync } from 'fs';
import { Lexer } from 'lexer';
import { Parser } from 'parser';
import { Interpreter } from 'interpreter';
import { SymbolBuilder, TypeChecker } from 'semantic-analyzer';
import { BaseSymbolScope } from 'symbol';
import { RunnableChain } from 'ast';
import PSIError from 'error';
import chalk from 'chalk';
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
      required: true,
      description: 'Input file path',
    },
  ];

  async run() {
    const { args, flags } = this.parse(Psi);
    const sourceCode = readFileSync(args.file, 'utf8');
    try {
      const lexer = new Lexer(sourceCode);
      const tree = new Parser(lexer).run();
      const baseScope = new BaseSymbolScope('root');
      new RunnableChain(
        new SymbolBuilder(tree, baseScope),
        new TypeChecker(tree, baseScope),
      ).run();
      const interpreter = new Interpreter(tree, baseScope);
      interpreter.run();
      console.log(
        (interpreter.scope.children as any).values().next().value.value,
      );
    } catch (error) {
      console.error(formatError(sourceCode, basename(args.file), error));

      console.error('Program execution halted with error(s).');

      process.exit(1);
    }
  }
}

export = Psi;
