import DataType from "./DataType";

export default class Integer extends DataType {
  constructor(private value: number) {
    super();
    if(!Number.isInteger(value)) {
      throw new Error('Invalid integer');
    }
  }

  public add(right: Integer): Integer {
    return new Integer(this.value + right.value);
  }
  public subtract(right: Integer): Integer {
    return new Integer(this.value - right.value);
  }
  public multiply(right: Integer): Integer {
    return new Integer(this.value * right.value);
  }
  public divide(right: Integer): Integer {
    throw new Error('Cannot use this operator with Integer types');
  }
  public integerDivide(right: Integer): Integer {
    return new Integer(Math.trunc(this.value / right.value));
  }
  public mod(right: Integer): Integer {
    return new Integer(this.value % right.value);
  }
  public equals(right: Integer): boolean {
    return this.value == right.value;
  }
  public lessThan(right: Integer): boolean {
    return this.value < right.value;
  }
  public greatherThan(right: Integer): boolean {
    return this.value > right.value;
  }
  public lessEqualsThan(right: Integer): boolean {
    return this.value <= right.value;
  }
  public greaterEqualsThan(right: Integer): boolean {
    return this.value >= right.value;
  }
  public unaryPlus(): Integer {
    return new Integer(this.value);
  }
  public unaryMinus(): Integer {
    return new Integer(-this.value);
  }
}
