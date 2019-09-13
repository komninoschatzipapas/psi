import { BinaryAST, AST } from '.';

export default class IntegerDivisonAST extends BinaryAST {
  constructor(left: AST, right: AST) {
    super(left, right);
  }
}
