import { Token } from '.';
import * as Types from 'data-types';

export default class IntegerConstToken implements Token {
  public readonly value: Types.PSIInteger;

  constructor(value: Types.PSIInteger) {
    this.value = value;
  }
}
