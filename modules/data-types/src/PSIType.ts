import { PSIDataType } from './PSIDataTypes';
import PSIError, { DebugInfoProvider } from 'error';

export default abstract class PSIType extends PSIDataType {
  public add(debugInfoProvider: DebugInfoProvider, right: PSIType): PSIType {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with type type',
    );
  }
  public subtract(
    debugInfoProvider: DebugInfoProvider,
    right: PSIType,
  ): PSIType {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with type type',
    );
  }
  public multiply(
    debugInfoProvider: DebugInfoProvider,
    right: PSIType,
  ): PSIType {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with type type',
    );
  }
  public divide(debugInfoProvider: DebugInfoProvider, right: PSIType): PSIType {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with type type',
    );
  }
  public integerDivide(
    debugInfoProvider: DebugInfoProvider,
    right: PSIType,
  ): PSIType {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with type type',
    );
  }
  public mod(debugInfoProvider: DebugInfoProvider, right: PSIType): PSIType {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with type type',
    );
  }
  public equals(debugInfoProvider: DebugInfoProvider, right: PSIType): boolean {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with type type',
    );
  }
  public lessThan(
    debugInfoProvider: DebugInfoProvider,
    right: PSIType,
  ): boolean {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with type type',
    );
  }
  public greaterThan(
    debugInfoProvider: DebugInfoProvider,
    right: PSIType,
  ): boolean {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with type type',
    );
  }
  public lessEqualsThan(
    debugInfoProvider: DebugInfoProvider,
    right: PSIType,
  ): boolean {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with type type',
    );
  }
  public greaterEqualsThan(
    debugInfoProvider: DebugInfoProvider,
    right: PSIType,
  ): boolean {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with type type',
    );
  }
  public unaryPlus(debugInfoProvider: DebugInfoProvider): PSIType {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with type type',
    );
  }
  public unaryMinus(debugInfoProvider: DebugInfoProvider): PSIType {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with type type',
    );
  }
}
