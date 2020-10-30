import CaseInsensitiveMap from '@pascal-psi/case-insensitive-map';
import LocalSymbolScope from './LocalSymbolScope';

export default class ScopeChildren extends CaseInsensitiveMap<
  string,
  LocalSymbolScope
> {
  public add(scope: LocalSymbolScope) {
    this.set(scope.name, scope);
  }

  public get(scopeName: string): LocalSymbolScope | null {
    const childScope = CaseInsensitiveMap.prototype.get.call(this, scopeName);
    if (childScope) {
      return childScope;
    } else {
      return null;
    }
  }
}
