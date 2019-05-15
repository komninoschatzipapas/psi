import {AST} from '.';
import ASTVisitor from '../ASTVisitor';

export default class CompoundAST extends AST {
  public readonly children: AST[];

  constructor(children: AST[]) {
    super();
    this.children = children;
  }
}
