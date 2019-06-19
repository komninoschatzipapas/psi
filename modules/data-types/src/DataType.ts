export default abstract class DataType {
  public abstract add(right: DataType): DataType;
  public abstract subtract(right: DataType): DataType;
  public abstract multiply(right: DataType): DataType;
  public abstract divide(right: DataType): DataType;
  public abstract integerDivide(right: DataType): DataType;
  public abstract mod(right: DataType): DataType;
  public abstract equals(right: DataType): boolean;
  public notEquals(right: DataType): boolean {
    return !this.equals(right);
  }
  public abstract lessThan(right: DataType): boolean;
  public abstract greatherThan(right: DataType): boolean;
  public abstract lessEqualsThan(right: DataType): boolean;
  public abstract greaterEqualsThan(right: DataType): boolean;
  public abstract unaryPlus(): DataType;
  public abstract unaryMinus(): DataType;
}