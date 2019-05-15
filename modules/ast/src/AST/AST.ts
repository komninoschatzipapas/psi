import { ASTVisitor } from "../AST";

export default abstract class AST {
  public readonly children: AST[] = [];
}
