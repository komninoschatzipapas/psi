import ConstantAST from './ConstantAST';
import * as Types from 'data-types';

export default class IntegerConstantAST extends ConstantAST {
  public readonly value: Types.PSIInteger;
  dataType = Types.PSIInteger;
  constructor(value: Types.PSIInteger) {
    super();
    this.value = value;
  }
}
