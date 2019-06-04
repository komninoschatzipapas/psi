import ConstantAST from './ConstantAST';
import * as Types from 'data-types';

export default class RealConstantAST extends ConstantAST {
  public readonly value: Types.Real;

  constructor(value: Types.Real) {
    super();
    this.value = value;
  }
}
