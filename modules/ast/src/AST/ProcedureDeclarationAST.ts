import { AST, BlockAST, VariableDeclarationAST } from ".";

export default class ProcedureDeclarationAST extends AST {
  public readonly name: string;

  constructor(name: string, public args: VariableDeclarationAST[], public block: BlockAST) {
    super();
    this.name = name;
    this.children.push(...args);
    this.children.push(block);
  }
}