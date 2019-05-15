import {AST} from '.';
import { VariableAST, TypeAST} from '.';
import ASTVisitor from '../ASTVisitor';

export default class VariableDeclarationAST extends AST {
  public readonly type: TypeAST;
  public readonly children: VariableAST[];

  constructor(public variable: VariableAST, type: TypeAST) {
    super();
    this.children = [variable];
    this.type = type;
  }
}
