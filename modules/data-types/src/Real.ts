import DataType from "./DataType";

export default class Real extends DataType {
  constructor(private value: number) {
    super();
  }

  public add(right: Real): Real {
    return new Real(this.value + right.value);
  }
  public subtract(right: Real): Real {
    return new Real(this.value - right.value);
  }
  public multiply(right: Real): Real {
    return new Real(this.value * right.value);
  }
  public divide(right: Real): Real {
    return new Real(this.value / right.value);
  }
  public integerDivide(right: Real): Real {
    throw new Error('Cannot use this operator with Real types');
  }
  public mod(right: Real): Real {
    return new Real(this.value % right.value);
  }
  public equals(right: Real): boolean {
    return this.value == right.value;
  }
  public lessThan(right: Real): boolean {
    return this.value < right.value;
  }
  public greatherThan(right: Real): boolean {
    return this.value > right.value;
  }
  public lessEqualsThan(right: Real): boolean {
    return this.value <= right.value;
  }
  public greaterEqualsThan(right: Real): boolean {
    return this.value >= right.value;
  }
  public unaryPlus(): Real {
    return new Real(this.value);
  }
  public unaryMinus(): Real {
    return new Real(-this.value);
  }
}
