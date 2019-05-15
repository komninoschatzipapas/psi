import { AST, BlockAST, VariableDeclarationAST } from ".";
import ASTVisitor from '../ASTVisitor';

export default class ProcedureDeclarationAST extends AST {
  public readonly name: string;

  constructor(name: string, public args: VariableDeclarationAST[], public block: BlockAST) {
    super();
    this.name = name;
    args.forEach((arg) => this.children.push(arg));
    this.children.push(block);
  }
}