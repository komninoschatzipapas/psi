import {Command, flags} from '@oclif/command'
import { readFileSync } from 'fs';
import {Lexer} from 'lexer';
import {Parser} from 'parser';
import {Interpreter} from 'interpreter';
import {SymbolBuilder, TypeChecker} from 'semantic-analyzer';
import {BaseSymbolScope} from 'symbol';

class Psi extends Command {
  static description = 'Interpret Pascal code'

  static flags = {
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
  }

  static args = [
    {
      name: 'file',
      required: true,
      description: 'Input file path'
    }
  ];

  async run() {
    const {args, flags} = this.parse(Psi)
    const sourceCode = readFileSync(args.file, 'utf8');
    const lexer = new Lexer(sourceCode);
    const tree = new Parser(lexer).run();
    const baseScope = new BaseSymbolScope('root');
    new SymbolBuilder(tree, baseScope).buildSymbols();
    new TypeChecker(tree, baseScope).checkTypes();
    const interpreter = new Interpreter(tree);
    interpreter.run();
  }
}

export = Psi;
