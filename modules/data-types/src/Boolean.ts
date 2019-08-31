import DataType from "./DataType";

export default class Boolean extends DataType {
  public static readonly true: Boolean = new Boolean(true);
  public static readonly false: Boolean = new Boolean(false);

  constructor(private readonly value: boolean) {
    super();
    if(value == true) {
      return Boolean.true;
    } else {
      return Boolean.false;
    }
  }

  public add(right: DataType): DataType {
    throw new Error('Cannot execute operation with boolean type');
  }
  public subtract(right: DataType): DataType {
    throw new Error('Cannot execute operation with boolean type');
  }
  public multiply(right: DataType): DataType {
    throw new Error('Cannot execute operation with boolean type');
  }
  public divide(right: DataType): DataType {
    throw new Error('Cannot execute operation with boolean type');
  }
  public integerDivide(right: DataType): DataType {
    throw new Error('Cannot execute operation with boolean type');
  }
  public mod(right: DataType): DataType {
    throw new Error('Cannot execute operation with boolean type');
  }
  public equals(right: Boolean): boolean {
    return this.value == right.value;
  }
  public lessThan(right: DataType): boolean {
    throw new Error('Cannot execute operation with boolean type');
  }
  public greaterThan(right: DataType): boolean {
    throw new Error('Cannot execute operation with boolean type');
  }
  public lessEqualsThan(right: DataType): boolean {
    throw new Error('Cannot execute operation with boolean type');
  }
  public greaterEqualsThan(right: DataType): boolean {
    throw new Error('Cannot execute operation with boolean type');
  }
  public unaryPlus(): DataType {
    throw new Error('Cannot execute operation with boolean type');
  }
  public unaryMinus(): DataType {
    throw new Error('Cannot execute operation with boolean type');
  }
}
