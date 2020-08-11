import { DebugInfoProvider } from 'error';

export default class PSISymbol extends DebugInfoProvider {
  public readonly name: string;

  constructor(name: string) {
    super();
    this.name = name;
  }
}
