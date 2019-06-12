import { DataType } from "./DataTypes";

export default class Char extends DataType {
  private value: number;
  constructor(value: string) {
    super();
    if(value.length != 1) {
      throw new Error('Invalid character length');
    }
    this.value = value.charCodeAt(0);
  }
  public add(right: Char): Char {
    throw new Error('Cannot execute this operator with the Char type');
  }
  public subtract(right: Char): Char {
    throw new Error('Cannot execute this operator with the Char type');
  }
  public multiply(right: Char): Char {
    throw new Error('Cannot execute this operator with the Char type');
  }
  public divide(right: Char): Char {
    throw new Error('Cannot execute this operator with the Char type');
  }
  public integerDivide(right: Char): Char {
    throw new Error('Cannot execute this operator with the Char type');
  }
  public mod(right: Char): Char {
    throw new Error('Cannot execute this operator with the Char type');
  }
  public equals(right: Char): boolean {
    return this.value == right.value;
  }
  public lessThan(right: Char): boolean {
    return this.value < right.value;
  }
  public greatherThan(right: Char): boolean {
    return this.value > right.value;
  }
  public lessEqualsThan(right: Char): boolean {
    return this.value <= right.value;
  }
  public greaterEqualsThan(right: Char): boolean {
    return this.value >= right.value;
  }
  public unaryPlus(): DataType {
    throw new Error('Cannot execute this operator with the Char type');
  }
  public unaryMinus(): DataType {
    throw new Error('Cannot execute this operator with the Char type');
  }
  public toBoolean(): boolean {
    throw new Error('Cannot execute this operator with the Char type');
  }
}