import { PSIDataType } from './PSIDataTypes';
import PSIError, { DebugInfoProvider } from 'error';

export default class PSIChar extends PSIDataType {
  private value: number;
  constructor(value: string) {
    super();
    this.value = value.charCodeAt(0);
  }
  public add(debugInfoProvider: DebugInfoProvider, right: PSIChar): PSIChar {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute this operator with the PSIChar type',
    );
  }
  public subtract(
    debugInfoProvider: DebugInfoProvider,
    right: PSIChar,
  ): PSIChar {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute this operator with the PSIChar type',
    );
  }
  public multiply(
    debugInfoProvider: DebugInfoProvider,
    right: PSIChar,
  ): PSIChar {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute this operator with the PSIChar type',
    );
  }
  public divide(debugInfoProvider: DebugInfoProvider, right: PSIChar): PSIChar {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute this operator with the PSIChar type',
    );
  }
  public integerDivide(
    debugInfoProvider: DebugInfoProvider,
    right: PSIChar,
  ): PSIChar {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute this operator with the PSIChar type',
    );
  }
  public mod(debugInfoProvider: DebugInfoProvider, right: PSIChar): PSIChar {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute this operator with the PSIChar type',
    );
  }
  public equals(debugInfoProvider: DebugInfoProvider, right: PSIChar): boolean {
    return this.value == right.value;
  }
  public lessThan(
    debugInfoProvider: DebugInfoProvider,
    right: PSIChar,
  ): boolean {
    return this.value < right.value;
  }
  public greaterThan(
    debugInfoProvider: DebugInfoProvider,
    right: PSIChar,
  ): boolean {
    return this.value > right.value;
  }
  public lessEqualsThan(
    debugInfoProvider: DebugInfoProvider,
    right: PSIChar,
  ): boolean {
    return this.value <= right.value;
  }
  public greaterEqualsThan(
    debugInfoProvider: DebugInfoProvider,
    right: PSIChar,
  ): boolean {
    return this.value >= right.value;
  }
  public unaryPlus(debugInfoProvider: DebugInfoProvider): PSIDataType {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute this operator with the PSIChar type',
    );
  }
  public unaryMinus(debugInfoProvider: DebugInfoProvider): PSIDataType {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute this operator with the PSIChar type',
    );
  }
}
