import PSISymbol from '../symbol/PSISymbol';
import CaseInsensitiveMap from 'case-insensitive-map';
import LocalSymbolScope from './LocalSymbolScope';

export default abstract class SymbolScope {
  private scope: CaseInsensitiveMap<string, PSISymbol>;
  public readonly children: ScopeChildren;
  protected abstract readonly parent: SymbolScope|null;
  public readonly name: string;

  constructor(name: string) {
    this.scope = new CaseInsensitiveMap();
    this.children = new ScopeChildren();
    this.name = name;
  }

  public getParent() {
    return this.parent;
  }

  public insert(symbol: PSISymbol) {
    if(this.has(symbol)) {
      throw new Error(`Cannot reinitialize symbol ${symbol.name}`);
    }

    this.scope.set(symbol.name, symbol);
  }

  public has(symbol: PSISymbol) {
    return this.scope.has(symbol.name);
  }

  public resolve<T extends PSISymbol>(name: string, symbolType: new (...a: any[]) => T): T|null {
    const result = this.scope.get(name);
    if(result && result instanceof symbolType) {
      return result;
    } else if(this.parent) {
      return this.parent.resolve(name, symbolType);
    } else {
      return null;
    }
  }
}

class ScopeChildren {
  private children: CaseInsensitiveMap<string, LocalSymbolScope>;

  constructor() {
    this.children = new CaseInsensitiveMap();
  }

  public add(scope: LocalSymbolScope) {
    this.children.set(scope.name, scope);
  }

  public get(scopeName: string): LocalSymbolScope|null {
    const childScope = this.children.get(scopeName);
    if(childScope) {
      return childScope;
    } else {
      return null;
    }
  }
}
