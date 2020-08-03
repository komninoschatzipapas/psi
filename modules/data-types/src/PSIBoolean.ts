import PSIDataType from './PSIDataType';
import PSIError, { DebugInfoProvider } from 'error';

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

  public add(
    debugInfoProvider: DebugInfoProvider,
    right: PSIDataType,
  ): PSIDataType {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with boolean type',
    );
  }
  public subtract(
    debugInfoProvider: DebugInfoProvider,
    right: PSIDataType,
  ): PSIDataType {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with boolean type',
    );
  }
  public multiply(
    debugInfoProvider: DebugInfoProvider,
    right: PSIDataType,
  ): PSIDataType {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with boolean type',
    );
  }
  public divide(
    debugInfoProvider: DebugInfoProvider,
    right: PSIDataType,
  ): PSIDataType {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with boolean type',
    );
  }
  public integerDivide(
    debugInfoProvider: DebugInfoProvider,
    right: PSIDataType,
  ): PSIDataType {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with boolean type',
    );
  }
  public mod(
    debugInfoProvider: DebugInfoProvider,
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
    debugInfoProvider: DebugInfoProvider,
    right: PSIDataType,
  ): boolean {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with boolean type',
    );
  }
  public greaterThan(
    debugInfoProvider: DebugInfoProvider,
    right: PSIDataType,
  ): boolean {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with boolean type',
    );
  }
  public lessEqualsThan(
    debugInfoProvider: DebugInfoProvider,
    right: PSIDataType,
  ): boolean {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with boolean type',
    );
  }
  public greaterEqualsThan(
    debugInfoProvider: DebugInfoProvider,
    right: PSIDataType,
  ): boolean {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with boolean type',
    );
  }
  public unaryPlus(debugInfoProvider: DebugInfoProvider): PSIDataType {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with boolean type',
    );
  }
  public unaryMinus(debugInfoProvider: DebugInfoProvider): PSIDataType {
    throw new PSIError(
      debugInfoProvider,
      'Cannot execute operation with boolean type',
    );
  }
}
