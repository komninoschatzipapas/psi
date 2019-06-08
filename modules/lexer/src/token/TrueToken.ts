import {IToken} from '.';

export default class TrueToken implements IToken {
  public readonly value: boolean = true;
}