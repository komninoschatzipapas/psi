import PSIDataType from './PSIDataType';
import PSIError, { DebugInfoProvider } from 'error';

export default class PSIReal extends PSIDataType {
  constructor(private value: number) {
    super();
  }

  public add(debugInfoProvider: DebugInfoProvider, right: PSIReal): PSIReal {
    return new PSIReal(this.value + right.value);
  }
  public subtract(
    debugInfoProvider: DebugInfoProvider,
    right: PSIReal,
  ): PSIReal {
    return new PSIReal(this.value - right.value);
  }
  public multiply(
    debugInfoProvider: DebugInfoProvider,
    right: PSIReal,
  ): PSIReal {
    return new PSIReal(this.value * right.value);
  }
  public divide(debugInfoProvider: DebugInfoProvider, right: PSIReal): PSIReal {
    return new PSIReal(this.value / right.value);
  }
  public integerDivide(
    debugInfoProvider: DebugInfoProvider,
    right: PSIReal,
  ): PSIReal {
    throw new PSIError(
      debugInfoProvider,
      'Cannot use this operator with PSIReal types',
    );
  }
  public mod(debugInfoProvider: DebugInfoProvider, right: PSIReal): PSIReal {
    return new PSIReal(this.value % right.value);
  }
  public equals(debugInfoProvider: DebugInfoProvider, right: PSIReal): boolean {
    return this.value == right.value;
  }
  public lessThan(
    debugInfoProvider: DebugInfoProvider,
    right: PSIReal,
  ): boolean {
    return this.value < right.value;
  }
  public greaterThan(
    debugInfoProvider: DebugInfoProvider,
    right: PSIReal,
  ): boolean {
    return this.value > right.value;
  }
  public lessEqualsThan(
    debugInfoProvider: DebugInfoProvider,
    right: PSIReal,
  ): boolean {
    return this.value <= right.value;
  }
  public greaterEqualsThan(
    debugInfoProvider: DebugInfoProvider,
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
