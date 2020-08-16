import TypeAST from './TypeAST';
import { ConstantAST } from '.';
import { BinaryAST } from '.';

export default class SubrangeAST extends BinaryAST {
  get dataType() {
    if (
      this.left.dataType &&
      this.right.dataType &&
      this.left.dataType === this.right.dataType
    ) {
      return this.left.dataType;
    } else {
      throw new Error(
        'Program error: SubrangeAST type could not be calculated',
      );
    }
  }

  constructor(
    public readonly left: ConstantAST,
    public readonly right: ConstantAST,
  ) {
    super(left, right);
  }
}
