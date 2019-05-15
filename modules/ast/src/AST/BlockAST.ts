import {AST, VariableDeclarationAST, CompoundAST, ProcedureDeclarationAST} from '.';
import ASTVisitor from '../ASTVisitor';

export default class BlockAST extends AST {
  constructor(
    public declarations: (VariableDeclarationAST|ProcedureDeclarationAST)[],
    public compoundStatement: CompoundAST
  ) {
    super();
    declarations.forEach((d) => this.children.push(d));
    this.children.push(compoundStatement);
  }
}
