import {IToken} from '.';
import * as Types from 'data-types';

export default class IntegerConstToken implements IToken {
  public readonly value: Types.Integer;

  constructor(value: Types.Integer) {
    this.value = value;
  }
}