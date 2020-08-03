import { PSIDataType } from './PSIDataTypes';
import PSIError, { DebugInfoProviderLike } from 'error';

export default abstract class PSIType extends PSIDataType {
  public add(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIType,
  ): PSIType {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with type type',
    );
  }
  public subtract(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIType,
  ): PSIType {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with type type',
    );
  }
  public multiply(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIType,
  ): PSIType {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with type type',
    );
  }
  public divide(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIType,
  ): PSIType {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with type type',
    );
  }
  public integerDivide(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIType,
  ): PSIType {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with type type',
    );
  }
  public mod(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIType,
  ): PSIType {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with type type',
    );
  }
  public equals(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIType,
  ): boolean {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with type type',
    );
  }
  public lessThan(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIType,
  ): boolean {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with type type',
    );
  }
  public greaterThan(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIType,
  ): boolean {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with type type',
    );
  }
  public lessEqualsThan(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIType,
  ): boolean {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with type type',
    );
  }
  public greaterEqualsThan(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIType,
  ): boolean {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with type type',
    );
  }
  public unaryPlus(debugInfoProvider: DebugInfoProviderLike): PSIType {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with type type',
    );
  }
  public unaryMinus(debugInfoProvider: DebugInfoProviderLike): PSIType {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with type type',
    );
  }
}
