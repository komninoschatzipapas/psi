import { Command, flags } from '@oclif/command';
import { readFileSync } from 'fs';
import { Lexer } from 'lexer';
import { Parser } from 'parser';
import { Interpreter } from 'interpreter';
import { SymbolBuilder, TypeChecker } from 'semantic-analyzer';
import { BaseSymbolScope } from 'symbol';
import { RunnableChain } from 'ast';

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
  }
}

export = Psi;
