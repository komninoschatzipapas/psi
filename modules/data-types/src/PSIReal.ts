import PSIDataType from './PSIDataType';

import PSIError, { DebugInfoProviderLike } from 'error';

export default class PSIReal extends PSIDataType {
  constructor(private value: number) {
    super();
  }

  public add(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIReal,
  ): PSIReal {
    return new PSIReal(this.value + right.value);
  }
  public subtract(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIReal,
  ): PSIReal {
    return new PSIReal(this.value - right.value);
  }
  public multiply(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIReal,
  ): PSIReal {
    return new PSIReal(this.value * right.value);
  }
  public divide(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIReal,
  ): PSIReal {
    return new PSIReal(this.value / right.value);
  }
  public integerDivide(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIReal,
  ): PSIReal {
    throw new PSIError(
      debugInfoProvider,
      'Cannot use this operator with PSIReal types',
    );
  }
  public mod(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIReal,
  ): PSIReal {
    return new PSIReal(this.value % right.value);
  }
  public equals(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIReal,
  ): boolean {
    return this.value == right.value;
  }
  public lessThan(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIReal,
  ): boolean {
    return this.value < right.value;
  }
  public greaterThan(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIReal,
  ): boolean {
    return this.value > right.value;
  }
  public lessEqualsThan(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIReal,
  ): boolean {
    return this.value <= right.value;
  }
  public greaterEqualsThan(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIReal,
  ): boolean {
    return this.value >= right.value;
  }
  public unaryPlus(): PSIReal {
    return new PSIReal(this.value);
  }
  public unaryMinus(): PSIReal {
    return new PSIReal(-this.value);
  }
}
