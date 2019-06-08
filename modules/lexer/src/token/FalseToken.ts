import {IToken} from '.';

export default class FalseToken implements IToken {
  public readonly value: boolean = false;
}