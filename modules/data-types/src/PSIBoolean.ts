import PSIDataType from './PSIDataType';
import PSIError, { DebugInfoProviderLike } from 'error';

export default class PSIBoolean extends PSIDataType {
  public static readonly true: PSIBoolean = new PSIBoolean(true);
  public static readonly false: PSIBoolean = new PSIBoolean(false);

  constructor(private readonly value: boolean) {
    super();
    if (value === true) {
      return PSIBoolean.true;
    } else {
      return PSIBoolean.false;
    }
  }

  public serialize() {
    return this.value;
  }

  public add(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIDataType,
  ): PSIDataType {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with boolean type',
    );
  }
  public subtract(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIDataType,
  ): PSIDataType {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with boolean type',
    );
  }
  public multiply(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIDataType,
  ): PSIDataType {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with boolean type',
    );
  }
  public divide(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIDataType,
  ): PSIDataType {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with boolean type',
    );
  }
  public integerDivide(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIDataType,
  ): PSIDataType {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with boolean type',
    );
  }
  public mod(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIDataType,
  ): PSIDataType {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with boolean type',
    );
  }
  public equals(right: PSIBoolean): boolean {
    return this.value == right.value;
  }
  public lessThan(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIDataType,
  ): boolean {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with boolean type',
    );
  }
  public greaterThan(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIDataType,
  ): boolean {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with boolean type',
    );
  }
  public lessEqualsThan(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIDataType,
  ): boolean {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with boolean type',
    );
  }
  public greaterEqualsThan(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIDataType,
  ): boolean {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with boolean type',
    );
  }
  public unaryPlus(debugInfoProvider: DebugInfoProviderLike): PSIDataType {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with boolean type',
    );
  }
  public unaryMinus(debugInfoProvider: DebugInfoProviderLike): PSIDataType {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with boolean type',
    );
  }
}
