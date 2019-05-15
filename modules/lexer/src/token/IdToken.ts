import {IToken} from '.';

export default class IdToken implements IToken {
  public readonly value: string;

  constructor(id: string) {
    this.value = id;
  }
}