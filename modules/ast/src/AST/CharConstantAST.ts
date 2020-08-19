import ConstantAST from './ConstantAST';
import * as Types from '@pascal-psi/data-types';

export default class CharConstantAST extends ConstantAST {
  public readonly value: Types.PSIChar;
  dataType = Types.PSIChar;

  constructor(value: Types.PSIChar) {
    super();
    this.value = value;
  }
}
