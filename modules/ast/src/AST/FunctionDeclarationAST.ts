import { TypeAST } from '.';
import { AST, BlockAST, VariableDeclarationAST } from '.';

export default class FunctionDeclarationAST extends AST {
  public readonly name: string;

  constructor(
    name: string,
    public args: VariableDeclarationAST[],
    public returnType: TypeAST,
    public block: BlockAST,
  ) {
    super();
    this.name = name;
    this.addChild(...args, returnType, block);
  }
}
