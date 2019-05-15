import {IToken} from '.';
import * as Types from 'data-types';

export default class RealConstToken implements IToken {
  public readonly value: Types.Real;

  constructor(value: Types.Real) {
    this.value = value;
  }
}