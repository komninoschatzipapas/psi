import {SymbolScope} from ".";

export default class LocalSymbolScope extends SymbolScope {
  public readonly parent: SymbolScope;

  constructor(name: string, parent: SymbolScope) {
    super(name);
    this.parent = parent;
    this.parent.children.add(this);
  }
}