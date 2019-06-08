import DataType from "./DataType";

export default class Boolean extends DataType {
  constructor(private readonly boolean: boolean) {
    super();
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
  public equals(right: DataType): boolean {
    throw new Error('Cannot execute operation with boolean type');
  }
  public lessThan(right: DataType): boolean {
    throw new Error('Cannot execute operation with boolean type');
  }
  public greatherThan(right: DataType): boolean {
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
  public toBoolean(): boolean {
    return this.boolean;
  }
}

Boolean.toString = () => 'Boolean';