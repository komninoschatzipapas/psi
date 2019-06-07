import {AST} from '.';

export default abstract class BinaryAST extends AST {
  constructor(public left: AST, public right: AST) {
    super();
    this.addChild(left, right);
  }
}
