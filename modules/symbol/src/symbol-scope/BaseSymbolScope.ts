import SymbolScope from './SymbolScope';
import { SymbolScopeType } from './SymbolScopeType';

export default class BaseSymbolScope extends SymbolScope {
  protected readonly parent: null;

  constructor(name: string) {
    super(name, SymbolScopeType.Root);
    this.parent = null;
  }
}
