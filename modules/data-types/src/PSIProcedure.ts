import { PSIDataType } from './PSIDataTypes';
import PSIError, { DebugInfoProviderLike } from 'error';

export default class PSIProcedure extends PSIDataType {
  constructor(public readonly call: (args: PSIDataType[]) => void) {
    super();
  }

  public add(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIProcedure,
  ): PSIDataType {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with procedure type',
    );
  }
  public subtract(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIProcedure,
  ): PSIDataType {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with procedure type',
    );
  }
  public multiply(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIProcedure,
  ): PSIDataType {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with procedure type',
    );
  }
  public divide(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIProcedure,
  ): PSIDataType {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with procedure type',
    );
  }
  public integerDivide(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIProcedure,
  ): PSIDataType {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with procedure type',
    );
  }
  public mod(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIProcedure,
  ): PSIDataType {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with procedure type',
    );
  }
  public equals(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIProcedure,
  ): boolean {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with procedure type',
    );
  }
  public lessThan(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIProcedure,
  ): boolean {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with procedure type',
    );
  }
  public greaterThan(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIProcedure,
  ): boolean {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with procedure type',
    );
  }
  public lessEqualsThan(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIProcedure,
  ): boolean {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with procedure type',
    );
  }
  public greaterEqualsThan(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIProcedure,
  ): boolean {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with procedure type',
    );
  }
  public unaryPlus(debugInfoProvider: DebugInfoProviderLike): PSIDataType {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with procedure type',
    );
  }
  public unaryMinus(debugInfoProvider: DebugInfoProviderLike): PSIDataType {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with procedure type',
    );
  }
}
