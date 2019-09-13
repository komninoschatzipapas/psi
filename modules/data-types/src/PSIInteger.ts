import PSIDataType from './PSIDataType';

export default class PSIInteger extends PSIDataType {
  constructor(private value: number) {
    super();
    if (!Number.isInteger(value)) {
      throw new Error('Invalid integer');
    }
  }

  public add(right: PSIInteger): PSIInteger {
    return new PSIInteger(this.value + right.value);
  }
  public subtract(right: PSIInteger): PSIInteger {
    return new PSIInteger(this.value - right.value);
  }
  public multiply(right: PSIInteger): PSIInteger {
    return new PSIInteger(this.value * right.value);
  }
  public divide(right: PSIInteger): PSIInteger {
    throw new Error('Cannot use this operator with PSIInteger types');
  }
  public integerDivide(right: PSIInteger): PSIInteger {
    return new PSIInteger(Math.trunc(this.value / right.value));
  }
  public mod(right: PSIInteger): PSIInteger {
    return new PSIInteger(this.value % right.value);
  }
  public equals(right: PSIInteger): boolean {
    return this.value == right.value;
  }
  public lessThan(right: PSIInteger): boolean {
    return this.value < right.value;
  }
  public greaterThan(right: PSIInteger): boolean {
    return this.value > right.value;
  }
  public lessEqualsThan(right: PSIInteger): boolean {
    return this.value <= right.value;
  }
  public greaterEqualsThan(right: PSIInteger): boolean {
    return this.value >= right.value;
  }
  public unaryPlus(): PSIInteger {
    return new PSIInteger(this.value);
  }
  public unaryMinus(): PSIInteger {
    return new PSIInteger(-this.value);
  }
}
