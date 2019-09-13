import PSIDataType from './PSIDataType';

export default class PSIReal extends PSIDataType {
  constructor(private value: number) {
    super();
  }

  public add(right: PSIReal): PSIReal {
    return new PSIReal(this.value + right.value);
  }
  public subtract(right: PSIReal): PSIReal {
    return new PSIReal(this.value - right.value);
  }
  public multiply(right: PSIReal): PSIReal {
    return new PSIReal(this.value * right.value);
  }
  public divide(right: PSIReal): PSIReal {
    return new PSIReal(this.value / right.value);
  }
  public integerDivide(right: PSIReal): PSIReal {
    throw new Error('Cannot use this operator with PSIReal types');
  }
  public mod(right: PSIReal): PSIReal {
    return new PSIReal(this.value % right.value);
  }
  public equals(right: PSIReal): boolean {
    return this.value == right.value;
  }
  public lessThan(right: PSIReal): boolean {
    return this.value < right.value;
  }
  public greaterThan(right: PSIReal): boolean {
    return this.value > right.value;
  }
  public lessEqualsThan(right: PSIReal): boolean {
    return this.value <= right.value;
  }
  public greaterEqualsThan(right: PSIReal): boolean {
    return this.value >= right.value;
  }
  public unaryPlus(): PSIReal {
    return new PSIReal(this.value);
  }
  public unaryMinus(): PSIReal {
    return new PSIReal(-this.value);
  }
}
