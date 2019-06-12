import {IToken} from '.';
import * as Types from 'data-types';

export default class CharConstantToken implements IToken {
  constructor(public readonly value: Types.Char) {

  }
}