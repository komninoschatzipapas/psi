import ConstantAST from './ConstantAST';
import * as Types from 'data-types';

export default class IntegerConstantAST extends ConstantAST {
  public readonly value: Types.Integer;

  constructor(value: Types.Integer) {
    super();
    this.value = value;
  }
}
