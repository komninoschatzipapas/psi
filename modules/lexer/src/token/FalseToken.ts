import { Token } from '.';

export default class FalseToken implements Token {
  public readonly value: boolean = false;
}
