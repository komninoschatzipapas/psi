export default abstract class PSIDataType {
  public abstract add(right: PSIDataType): PSIDataType;
  public abstract subtract(right: PSIDataType): PSIDataType;
  public abstract multiply(right: PSIDataType): PSIDataType;
  public abstract divide(right: PSIDataType): PSIDataType;
  public abstract integerDivide(right: PSIDataType): PSIDataType;
  public abstract mod(right: PSIDataType): PSIDataType;
  public abstract equals(right: PSIDataType): boolean;
  public notEquals(right: PSIDataType): boolean {
    return !this.equals(right);
  }
  public abstract lessThan(right: PSIDataType): boolean;
  public abstract greaterThan(right: PSIDataType): boolean;
  public abstract lessEqualsThan(right: PSIDataType): boolean;
  public abstract greaterEqualsThan(right: PSIDataType): boolean;
  public abstract unaryPlus(): PSIDataType;
  public abstract unaryMinus(): PSIDataType;
}
