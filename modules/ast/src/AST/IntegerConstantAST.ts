import ConstantAST from './ConstantAST';
import * as Types from '@pascal-psi/data-types';
import { AST, RealConstantAST } from '.';

export default class IntegerConstantAST extends ConstantAST {
  public readonly value: Types.PSIInteger;
  dataType = Types.PSIInteger;
  constructor(value: Types.PSIInteger) {
    super();
    this.value = value;

    this.promote.set(Types.PSIReal, () => {
      return new RealConstantAST(this.value.promote!.get(
        Types.PSIReal,
      )!() as Types.PSIReal);
    });
  }

  public promote: Map<typeof Types.PSIDataType, () => AST> = new Map();
}
