import {AST} from '.';
import ASTVisitor from '../ASTVisitor';

export default class VariableAST extends AST {
  public readonly name: string;

  constructor(name: string) {
    super();
    this.name = name;
  }
}
