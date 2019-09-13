import { Token } from '.';

export default class TrueToken implements Token {
  public readonly value: boolean = true;
}
