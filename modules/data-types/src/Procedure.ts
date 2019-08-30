import { DataType } from "./DataTypes";

export default class Procedure extends DataType {

  constructor(public readonly call: (args: DataType[]) => void) {
    super();
  }

  public add(right: DataType): DataType {
    throw new Error('Cannot execute operations with procedure type');
  }
  public subtract(right: DataType): DataType {
    throw new Error('Cannot execute operations with procedure type');
  }
  public multiply(right: DataType): DataType {
    throw new Error('Cannot execute operations with procedure type');
  }
  public divide(right: DataType): DataType {
    throw new Error('Cannot execute operations with procedure type');
  }
  public integerDivide(right: DataType): DataType {
    throw new Error('Cannot execute operations with procedure type');
  }
  public mod(right: DataType): DataType {
    throw new Error('Cannot execute operations with procedure type');
  }
  public equals(right: DataType): boolean {
    throw new Error('Cannot execute operations with procedure type');
  }
  public lessThan(right: DataType): boolean {
    throw new Error('Cannot execute operations with procedure type');
  }
  public greaterThan(right: DataType): boolean {
    throw new Error('Cannot execute operations with procedure type');
  }
  public lessEqualsThan(right: DataType): boolean {
    throw new Error('Cannot execute operations with procedure type');
  }
  public greaterEqualsThan(right: DataType): boolean {
    throw new Error('Cannot execute operations with procedure type');
  }
  public unaryPlus(): DataType {
    throw new Error('Cannot execute operations with procedure type');
  }
  public unaryMinus(): DataType {
    throw new Error('Cannot execute operations with procedure type');
  }
}
