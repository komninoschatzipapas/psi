import { Token } from '.';
import * as Types from 'data-types';

export default class CharConstantToken implements Token {
  constructor(public readonly value: Types.PSIChar) {}
}
