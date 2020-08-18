import { BinaryAST } from '.';
import { VariableAST } from '.';
import { ArrayAccessAST } from '.';
import { AST } from '.';

export default class AssignmentAST extends BinaryAST {
  constructor(
    public readonly left: VariableAST | ArrayAccessAST,
    public readonly right: AST,
  ) {
    super(left, right);
  }
}
