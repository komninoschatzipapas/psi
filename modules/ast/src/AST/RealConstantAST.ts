import ConstantAST from './ConstantAST';
import * as Types from 'data-types';

export default class RealConstantAST extends ConstantAST {
  public readonly value: Types.PSIReal;

  constructor(value: Types.PSIReal) {
    super();
    this.value = value;
  }
}
