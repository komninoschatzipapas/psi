import { Token } from '.';
import * as Types from 'data-types';

export default class IntegerConstToken extends Token {
  public readonly value: Types.PSIInteger;

  constructor(value: Types.PSIInteger) {
    super();
    this.value = value;
  }
}
