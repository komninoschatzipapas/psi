import { AST } from '.';
import { VariableAST } from '.';

export default class ArrayAccessAST extends AST {
  constructor(public array: VariableAST, public accessors: AST[]) {
    super();
    this.addChild(array, ...accessors);
  }
}
