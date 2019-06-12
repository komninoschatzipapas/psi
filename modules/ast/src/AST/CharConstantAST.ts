import ConstantAST from './ConstantAST';
import * as Types from 'data-types';

export default class CharConstantAST extends ConstantAST {
  public readonly value: Types.Char;

  constructor(value: Types.Char) {
    super();
    this.value = value;
  }
}
