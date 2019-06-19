import { DataType } from "./DataTypes";

export default class Void extends DataType {
  public add(right: DataType): DataType {
    throw new Error('Cannot execute operations with void type');
  }
  public subtract(right: DataType): DataType {
    throw new Error('Cannot execute operations with void type');
  }
  public multiply(right: DataType): DataType {
    throw new Error('Cannot execute operations with void type');
  }
  public divide(right: DataType): DataType {
    throw new Error('Cannot execute operations with void type');
  }
  public integerDivide(right: DataType): DataType {
    throw new Error('Cannot execute operations with void type');
  }
  public mod(right: DataType): DataType {
    throw new Error('Cannot execute operations with void type');
  }
  public equals(right: DataType): boolean {
    throw new Error('Cannot execute operations with void type');
  }
  public lessThan(right: DataType): boolean {
    throw new Error('Cannot execute operations with void type');
  }
  public greatherThan(right: DataType): boolean {
    throw new Error('Cannot execute operations with void type');
  }
  public lessEqualsThan(right: DataType): boolean {
    throw new Error('Cannot execute operations with void type');
  }
  public greaterEqualsThan(right: DataType): boolean {
    throw new Error('Cannot execute operations with void type');
  }
  public unaryPlus(): DataType {
    throw new Error('Cannot execute operations with void type');
  }
  public unaryMinus(): DataType {
    throw new Error('Cannot execute operations with void type');
  }
}
