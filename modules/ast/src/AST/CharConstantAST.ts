import ConstantAST from './ConstantAST';
import * as Types from 'data-types';

export default class CharConstantAST extends ConstantAST {
  public readonly value: Types.PSIChar;

  constructor(value: Types.PSIChar) {
    super();
    this.value = value;
  }
}
