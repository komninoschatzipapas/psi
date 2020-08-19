import { Token } from '.';
import * as Types from '@pascal-psi/data-types';

export default class CharConstantToken extends Token {
  constructor(public readonly value: Types.PSIChar) {
    super();
  }
}
