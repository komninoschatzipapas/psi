import { DataType } from "./DataTypes";

export default abstract class Type extends DataType {
  public add(right: DataType): DataType {
    throw new Error('Cannot execute operations with type type');
  }
  public subtract(right: DataType): DataType {
    throw new Error('Cannot execute operations with type type');
  }
  public multiply(right: DataType): DataType {
    throw new Error('Cannot execute operations with type type');
  }
  public divide(right: DataType): DataType {
    throw new Error('Cannot execute operations with type type');
  }
  public integerDivide(right: DataType): DataType {
    throw new Error('Cannot execute operations with type type');
  }
  public mod(right: DataType): DataType {
    throw new Error('Cannot execute operations with type type');
  }
  public equals(right: DataType): boolean {
    throw new Error('Cannot execute operations with type type');
  }
  public lessThan(right: DataType): boolean {
    throw new Error('Cannot execute operations with type type');
  }
  public greatherThan(right: DataType): boolean {
    throw new Error('Cannot execute operations with type type');
  }
  public lessEqualsThan(right: DataType): boolean {
    throw new Error('Cannot execute operations with type type');
  }
  public greaterEqualsThan(right: DataType): boolean {
    throw new Error('Cannot execute operations with type type');
  }
  public unaryPlus(): DataType {
    throw new Error('Cannot execute operations with type type');
  }
  public unaryMinus(): DataType {
    throw new Error('Cannot execute operations with type type');
  }
}
