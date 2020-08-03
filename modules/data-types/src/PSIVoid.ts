import { PSIDataType } from './PSIDataTypes';
import PSIError, { DebugInfoProvider } from 'error';

export default class PSIVoid extends PSIDataType {
  public add(debugInfoProvider: DebugInfoProvider, right: PSIVoid): PSIVoid {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with void type',
    );
  }
  public subtract(
    debugInfoProvider: DebugInfoProvider,
    right: PSIVoid,
  ): PSIVoid {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with void type',
    );
  }
  public multiply(
    debugInfoProvider: DebugInfoProvider,
    right: PSIVoid,
  ): PSIVoid {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with void type',
    );
  }
  public divide(debugInfoProvider: DebugInfoProvider, right: PSIVoid): PSIVoid {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with void type',
    );
  }
  public integerDivide(
    debugInfoProvider: DebugInfoProvider,
    right: PSIVoid,
  ): PSIVoid {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with void type',
    );
  }
  public mod(debugInfoProvider: DebugInfoProvider, right: PSIVoid): PSIVoid {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with void type',
    );
  }
  public equals(debugInfoProvider: DebugInfoProvider, right: PSIVoid): boolean {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with void type',
    );
  }
  public lessThan(
    debugInfoProvider: DebugInfoProvider,
    right: PSIVoid,
  ): boolean {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with void type',
    );
  }
  public greaterThan(
    debugInfoProvider: DebugInfoProvider,
    right: PSIVoid,
  ): boolean {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with void type',
    );
  }
  public lessEqualsThan(
    debugInfoProvider: DebugInfoProvider,
    right: PSIVoid,
  ): boolean {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with void type',
    );
  }
  public greaterEqualsThan(
    debugInfoProvider: DebugInfoProvider,
    right: PSIVoid,
  ): boolean {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with void type',
    );
  }
  public unaryPlus(debugInfoProvider: DebugInfoProvider): PSIVoid {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with void type',
    );
  }
  public unaryMinus(debugInfoProvider: DebugInfoProvider): PSIVoid {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with void type',
    );
  }
}
