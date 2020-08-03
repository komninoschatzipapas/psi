import { PSIDataType } from './PSIDataTypes';
import PSIError, { DebugInfoProvider } from 'error';

export default class PSIProcedure extends PSIDataType {
  constructor(public readonly call: (args: PSIDataType[]) => void) {
    super();
  }

  public add(
    debugInfoProvider: DebugInfoProvider,
    right: PSIProcedure,
  ): PSIDataType {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with procedure type',
    );
  }
  public subtract(
    debugInfoProvider: DebugInfoProvider,
    right: PSIProcedure,
  ): PSIDataType {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with procedure type',
    );
  }
  public multiply(
    debugInfoProvider: DebugInfoProvider,
    right: PSIProcedure,
  ): PSIDataType {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with procedure type',
    );
  }
  public divide(
    debugInfoProvider: DebugInfoProvider,
    right: PSIProcedure,
  ): PSIDataType {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with procedure type',
    );
  }
  public integerDivide(
    debugInfoProvider: DebugInfoProvider,
    right: PSIProcedure,
  ): PSIDataType {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with procedure type',
    );
  }
  public mod(
    debugInfoProvider: DebugInfoProvider,
    right: PSIProcedure,
  ): PSIDataType {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with procedure type',
    );
  }
  public equals(
    debugInfoProvider: DebugInfoProvider,
    right: PSIProcedure,
  ): boolean {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with procedure type',
    );
  }
  public lessThan(
    debugInfoProvider: DebugInfoProvider,
    right: PSIProcedure,
  ): boolean {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with procedure type',
    );
  }
  public greaterThan(
    debugInfoProvider: DebugInfoProvider,
    right: PSIProcedure,
  ): boolean {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with procedure type',
    );
  }
  public lessEqualsThan(
    debugInfoProvider: DebugInfoProvider,
    right: PSIProcedure,
  ): boolean {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with procedure type',
    );
  }
  public greaterEqualsThan(
    debugInfoProvider: DebugInfoProvider,
    right: PSIProcedure,
  ): boolean {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with procedure type',
    );
  }
  public unaryPlus(debugInfoProvider: DebugInfoProvider): PSIDataType {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with procedure type',
    );
  }
  public unaryMinus(debugInfoProvider: DebugInfoProvider): PSIDataType {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with procedure type',
    );
  }
}
