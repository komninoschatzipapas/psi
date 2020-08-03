import PSIDataType from './PSIDataType';
import PSIError, { DebugInfoProvider } from 'error';

export default class PSIInteger extends PSIDataType {
  constructor(private value: number) {
    super();
  }

  public add(
    debugInfoProvider: DebugInfoProvider,
    right: PSIInteger,
  ): PSIInteger {
    return new PSIInteger(this.value + right.value);
  }
  public subtract(
    debugInfoProvider: DebugInfoProvider,
    right: PSIInteger,
  ): PSIInteger {
    return new PSIInteger(this.value - right.value);
  }
  public multiply(
    debugInfoProvider: DebugInfoProvider,
    right: PSIInteger,
  ): PSIInteger {
    return new PSIInteger(this.value * right.value);
  }
  public divide(
    debugInfoProvider: DebugInfoProvider,
    right: PSIInteger,
  ): PSIInteger {
    throw new PSIError(
      debugInfoProvider,
      'Cannot use this operator with PSIInteger types',
    );
  }
  public integerDivide(
    debugInfoProvider: DebugInfoProvider,
    right: PSIInteger,
  ): PSIInteger {
    return new PSIInteger(Math.trunc(this.value / right.value));
  }
  public mod(
    debugInfoProvider: DebugInfoProvider,
    right: PSIInteger,
  ): PSIInteger {
    return new PSIInteger(this.value % right.value);
  }
  public equals(
    debugInfoProvider: DebugInfoProvider,
    right: PSIInteger,
  ): boolean {
    return this.value == right.value;
  }
  public lessThan(
    debugInfoProvider: DebugInfoProvider,
    right: PSIInteger,
  ): boolean {
    return this.value < right.value;
  }
  public greaterThan(
    debugInfoProvider: DebugInfoProvider,
    right: PSIInteger,
  ): boolean {
    return this.value > right.value;
  }
  public lessEqualsThan(
    debugInfoProvider: DebugInfoProvider,
    right: PSIInteger,
  ): boolean {
    return this.value <= right.value;
  }
  public greaterEqualsThan(
    debugInfoProvider: DebugInfoProvider,
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
