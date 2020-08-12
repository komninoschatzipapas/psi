import TypeAST from './TypeAST';
import { ConstantAST } from '.';
import { BinaryAST } from '.';

export default class SubrangeAST extends BinaryAST {
  constructor(
    public readonly left: ConstantAST,
    public readonly right: ConstantAST,
  ) {
    super(left, right);
  }
}
