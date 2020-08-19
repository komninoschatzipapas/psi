import ConstantAST from './ConstantAST';
import * as Types from '@pascal-psi/data-types';

export default class RealConstantAST extends ConstantAST {
  public readonly value: Types.PSIReal;
  dataType = Types.PSIReal;
  constructor(value: Types.PSIReal) {
    super();
    this.value = value;
  }
}
