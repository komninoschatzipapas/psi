import { Token } from '.';
import * as Types from 'data-types';

export default class RealConstToken implements Token {
  public readonly value: Types.PSIReal;

  constructor(value: Types.PSIReal) {
    this.value = value;
  }
}
