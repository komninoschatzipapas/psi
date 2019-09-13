import { Token } from '.';

export default class IdToken implements Token {
  public readonly value: string;

  constructor(id: string) {
    this.value = id;
  }
}
