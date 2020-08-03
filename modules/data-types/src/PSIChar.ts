import { PSIDataType } from './PSIDataTypes';
import PSIError, { DebugInfoProviderLike } from 'error';

export default class PSIChar extends PSIDataType {
  private value: number;
  constructor(value: string) {
    super();
    this.value = value.charCodeAt(0);
  }
  public add(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIChar,
  ): PSIChar {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute this operator with the PSIChar type',
    );
  }
  public subtract(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIChar,
  ): PSIChar {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute this operator with the PSIChar type',
    );
  }
  public multiply(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIChar,
  ): PSIChar {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute this operator with the PSIChar type',
    );
  }
  public divide(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIChar,
  ): PSIChar {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute this operator with the PSIChar type',
    );
  }
  public integerDivide(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIChar,
  ): PSIChar {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute this operator with the PSIChar type',
    );
  }
  public mod(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIChar,
  ): PSIChar {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute this operator with the PSIChar type',
    );
  }
  public equals(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIChar,
  ): boolean {
    return this.value == right.value;
  }
  public lessThan(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIChar,
  ): boolean {
    return this.value < right.value;
  }
  public greaterThan(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIChar,
  ): boolean {
    return this.value > right.value;
  }
  public lessEqualsThan(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIChar,
  ): boolean {
    return this.value <= right.value;
  }
  public greaterEqualsThan(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIChar,
  ): boolean {
    return this.value >= right.value;
  }
  public unaryPlus(debugInfoProvider: DebugInfoProviderLike): PSIDataType {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute this operator with the PSIChar type',
    );
  }
  public unaryMinus(debugInfoProvider: DebugInfoProviderLike): PSIDataType {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute this operator with the PSIChar type',
    );
  }
}
