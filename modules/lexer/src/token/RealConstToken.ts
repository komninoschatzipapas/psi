import { Token } from '.';
import * as Types from 'data-types';

export default class RealConstToken extends Token {
  public readonly value: Types.PSIReal;

  constructor(value: Types.PSIReal) {
    super();
    this.value = value;
  }
}
