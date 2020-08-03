import { Token } from '.';

export default class IdToken extends Token {
  public readonly value: string;

  constructor(id: string) {
    super();
    this.value = id;
  }
}
