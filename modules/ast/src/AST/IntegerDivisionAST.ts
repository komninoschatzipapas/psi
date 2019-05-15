import {BinaryAST, AST} from '.';
import ASTVisitor from '../ASTVisitor';

export default class IntegerDivisonAST extends BinaryAST {
  constructor(left: AST, right: AST) {
    super(left, right);
  }
}
