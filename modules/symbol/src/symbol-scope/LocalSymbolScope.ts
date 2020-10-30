import SymbolScope from './SymbolScope';
import { SymbolScopeType } from './SymbolScopeType';

export default class LocalSymbolScope extends SymbolScope {
  protected readonly parent: SymbolScope;

  constructor(name: string, type: SymbolScopeType, parent: SymbolScope) {
    super(name, type);
    this.parent = parent;
    this.parent.children.add(this);
  }
}
