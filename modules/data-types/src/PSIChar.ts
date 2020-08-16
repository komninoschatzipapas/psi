import { PSIDataType } from './PSIDataTypes';
import PSIError, { DebugInfoProviderLike } from 'error';

export default class PSIChar extends PSIDataType {
  private get valueInteger() {
    return this.value.charCodeAt(0);
  }

  constructor(private value: string) {
    super();
  }

  public serialize() {
    return this.value;
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
    return this.valueInteger < right.valueInteger;
  }
  public greaterThan(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIChar,
  ): boolean {
    return this.valueInteger > right.valueInteger;
  }
  public lessEqualsThan(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIChar,
  ): boolean {
    return this.valueInteger <= right.valueInteger;
  }
  public greaterEqualsThan(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIChar,
  ): boolean {
    return this.valueInteger >= right.valueInteger;
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
