import { DebugInfoProvider, DebugInfoProviderLike } from 'error';

export default abstract class PSIDataType extends DebugInfoProvider {
  public abstract add(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIDataType,
  ): PSIDataType;
  public abstract subtract(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIDataType,
  ): PSIDataType;
  public abstract multiply(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIDataType,
  ): PSIDataType;
  public abstract divide(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIDataType,
  ): PSIDataType;
  public abstract integerDivide(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIDataType,
  ): PSIDataType;
  public abstract mod(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIDataType,
  ): PSIDataType;
  public abstract equals(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIDataType,
  ): boolean;
  public notEquals(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIDataType,
  ): boolean {
    return !this.equals(debugInfoProvider, right);
  }
  public abstract lessThan(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIDataType,
  ): boolean;
  public abstract greaterThan(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIDataType,
  ): boolean;
  public abstract lessEqualsThan(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIDataType,
  ): boolean;
  public abstract greaterEqualsThan(
    debugInfoProvider: DebugInfoProviderLike,
    right: PSIDataType,
  ): boolean;
  public abstract unaryPlus(
    debugInfoProvider: DebugInfoProviderLike,
  ): PSIDataType;
  public abstract unaryMinus(
    debugInfoProvider: DebugInfoProviderLike,
  ): PSIDataType;

  public static treatAs?: typeof PSIDataType;
  public static isSubrangeType = false;
  public static isArrayType = false;
  public isArray = false;
  public isSubrange = false;

  public static defaultValue?: PSIDataType;
}
