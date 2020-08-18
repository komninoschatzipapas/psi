import PSIDataType from './PSIDataType';
import PSIReal from './PSIReal';

export default class PSIInteger extends PSIDataType {
  constructor(private value: number) {
    super();

    this.promote.set(PSIReal, () => {
      return new PSIReal(this.value);
    });
  }

  public promote: Map<typeof PSIDataType, () => PSIDataType> = new Map();

  public static promotable = [PSIReal];

  public serialize() {
    return this.value;
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
  public divide(right: PSIInteger): PSIReal {
    return new PSIReal(this.value / right.value);
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
  public notEquals(right: PSIInteger): boolean {
    return this.value != right.value;
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
