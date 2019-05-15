import {SymbolScope} from ".";

export default class BaseSymbolScope extends SymbolScope {
  public readonly parent: null;

  constructor(name: string) {
    super(name);
    this.parent = null;
  }
}