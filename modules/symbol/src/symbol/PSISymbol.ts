import { DebugInfoProvider } from '@pascal-psi/error';

export default class PSISymbol extends DebugInfoProvider {
  public readonly name: string;

  constructor(name: string, ..._: any[]) {
    super();
    this.name = name;
  }
}
