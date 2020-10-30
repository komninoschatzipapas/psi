import PSISymbol from '../symbol/PSISymbol';
import CaseInsensitiveMap from '@pascal-psi/case-insensitive-map';
import ScopeChildren from './ScopeChildren';
import { PSIDataType, PSIArrayLike, PSIFunction } from '@pascal-psi/data-types';
import PSIError from '@pascal-psi/error';
import { FunctionSymbol, VariableSymbol } from '../symbol';
import { SymbolScopeType } from './SymbolScopeType';

export default abstract class SymbolScope {
  private scope: CaseInsensitiveMap<string, PSISymbol>;
  private value: CaseInsensitiveMap<string, PSIDataType>;
  public readonly children: ScopeChildren;
  protected abstract readonly parent: SymbolScope | null;

  constructor(
    public readonly name: string,
    public readonly type: SymbolScopeType,
  ) {
    this.scope = new CaseInsensitiveMap();
    this.value = new CaseInsensitiveMap();
    this.children = new ScopeChildren();
  }

  public resolveValue<T extends PSIDataType>(name: string): T | null {
    const result = this.value.get(name);
    if (result) {
      return result;
    } else if (this.parent) {
      return this.parent.resolveValue(name);
    } else {
      return null;
    }
  }

  public resolveValueThisScopeOnly<T extends PSIDataType>(
    name: string,
  ): T | null {
    const result = this.value.get(name);
    return result || null;
  }

  public changeArrayValue(
    arrayName: string,
    accessors: PSIDataType[],
    value: PSIDataType,
  ) {
    const scope = this.findScope(arrayName)!;
    const array = scope.resolveValueThisScopeOnly(arrayName)! as PSIDataType &
      PSIArrayLike;

    array.changeValue(accessors, value);
  }

  public changeFunctionReturnType(name: string, value: PSIDataType) {
    const scope = this.findScope(name)!;

    const fn = scope.resolveValueThisScopeOnly<PSIFunction>(name)!;

    fn.returnValue = value;
    scope.value.set(name, fn);
  }

  public changeValue(name: string, value: PSIDataType) {
    return this.findScope(name)!.value.set(name, value);
  }

  private findScope(name: string): SymbolScope | null {
    const result = this.scope.get(name);
    if (result) {
      return this;
    } else if (this.parent) {
      return this.parent.findScope(name);
    } else {
      return null;
    }
  }

  public getParent() {
    return this.parent;
  }

  public insert(symbol: PSISymbol) {
    if (this.has(symbol)) {
      throw new PSIError(symbol, `Symbol ${symbol.name} is being redeclared`);
    }

    this.scope.set(symbol.name, symbol);
    if (symbol instanceof VariableSymbol && symbol.type.defaultValue) {
      this.value.set(symbol.name, symbol.type.defaultValue!);
    }
  }

  public has(symbol: PSISymbol) {
    return this.scope.has(symbol.name);
  }

  public resolve<T extends typeof PSISymbol>(
    name: string,
    type?: T,
  ): InstanceType<T> | null {
    const result = this.scope.get(name);
    if (result && (type ? result instanceof type : true)) {
      return result;
    } else if (this.parent) {
      return this.parent.resolve(name, type);
    } else {
      return null;
    }
  }
}
