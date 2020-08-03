import { PSIDataType } from './PSIDataTypes';
import PSIError, { DebugInfoProviderLike } from 'error';

export default class PSIVoid extends PSIDataType {
  public add(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIVoid,
  ): PSIVoid {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with void type',
    );
  }
  public subtract(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIVoid,
  ): PSIVoid {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with void type',
    );
  }
  public multiply(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIVoid,
  ): PSIVoid {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with void type',
    );
  }
  public divide(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIVoid,
  ): PSIVoid {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with void type',
    );
  }
  public integerDivide(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIVoid,
  ): PSIVoid {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with void type',
    );
  }
  public mod(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIVoid,
  ): PSIVoid {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with void type',
    );
  }
  public equals(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIVoid,
  ): boolean {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with void type',
    );
  }
  public lessThan(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIVoid,
  ): boolean {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with void type',
    );
  }
  public greaterThan(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIVoid,
  ): boolean {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with void type',
    );
  }
  public lessEqualsThan(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIVoid,
  ): boolean {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with void type',
    );
  }
  public greaterEqualsThan(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIVoid,
  ): boolean {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with void type',
    );
  }
  public unaryPlus(debugInfoProvider: DebugInfoProviderLike): PSIVoid {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with void type',
    );
  }
  public unaryMinus(debugInfoProvider: DebugInfoProviderLike): PSIVoid {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with void type',
    );
  }
}
