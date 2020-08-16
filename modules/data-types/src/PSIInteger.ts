import PSIDataType from './PSIDataType';
import PSIError, { DebugInfoProviderLike } from 'error';

export default class PSIInteger extends PSIDataType {
  constructor(private value: number) {
    super();
  }

  public serialize() {
    return this.value;
  }

  public add(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIInteger,
  ): PSIInteger {
    return new PSIInteger(this.value + right.value);
  }
  public subtract(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIInteger,
  ): PSIInteger {
    return new PSIInteger(this.value - right.value);
  }
  public multiply(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIInteger,
  ): PSIInteger {
    return new PSIInteger(this.value * right.value);
  }
  public divide(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIInteger,
  ): PSIInteger {
    throw new PSIError(
      debugInfoProvider,
      'Cannot use this operator with PSIInteger types',
    );
  }
  public integerDivide(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIInteger,
  ): PSIInteger {
    return new PSIInteger(Math.trunc(this.value / right.value));
  }
  public mod(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIInteger,
  ): PSIInteger {
    return new PSIInteger(this.value % right.value);
  }
  public equals(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIInteger,
  ): boolean {
    return this.value == right.value;
  }
  public lessThan(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIInteger,
  ): boolean {
    return this.value < right.value;
  }
  public greaterThan(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIInteger,
  ): boolean {
    return this.value > right.value;
  }
  public lessEqualsThan(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIInteger,
  ): boolean {
    return this.value <= right.value;
  }
  public greaterEqualsThan(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIInteger,
  ): boolean {
    return this.value >= right.value;
  }
  public unaryPlus(): PSIInteger {
    return new PSIInteger(this.value);
  }
  public unaryMinus(): PSIInteger {
    return new PSIInteger(-this.value);
  }
}
