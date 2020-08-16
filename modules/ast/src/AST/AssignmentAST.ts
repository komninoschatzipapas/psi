import { BinaryAST } from '.';
import { VariableAST } from '.';
import { ArrayAccessAST } from '.';
import { AST } from '.';

export default class AssignmentAST extends BinaryAST {
  constructor(public left: VariableAST | ArrayAccessAST, public right: AST) {
    super(left, right);
  }
}
