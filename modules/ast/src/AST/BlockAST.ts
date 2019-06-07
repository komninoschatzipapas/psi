import {AST, VariableDeclarationAST, CompoundAST, ProcedureDeclarationAST} from '.';

export default class BlockAST extends AST {
  constructor(
    public declarations: (VariableDeclarationAST|ProcedureDeclarationAST)[],
    public compoundStatement: CompoundAST
  ) {
    super();
    this.addChild(...declarations, compoundStatement);
  }
}
