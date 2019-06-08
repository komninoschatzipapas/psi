import {SymbolScope} from ".";

export default class BaseSymbolScope extends SymbolScope {
  protected readonly parent: null;

  constructor(name: string) {
    super(name);
    this.parent = null;
  }
}