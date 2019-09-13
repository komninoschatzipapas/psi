import { PSIDataType } from './PSIDataTypes';

export default class PSIChar extends PSIDataType {
  private value: number;
  constructor(value: string) {
    super();
    if (value.length != 1) {
      throw new Error('Invalid character length');
    }
    this.value = value.charCodeAt(0);
  }
  public add(right: PSIChar): PSIChar {
    throw new Error('Cannot execute this operator with the PSIChar type');
  }
  public subtract(right: PSIChar): PSIChar {
    throw new Error('Cannot execute this operator with the PSIChar type');
  }
  public multiply(right: PSIChar): PSIChar {
    throw new Error('Cannot execute this operator with the PSIChar type');
  }
  public divide(right: PSIChar): PSIChar {
    throw new Error('Cannot execute this operator with the PSIChar type');
  }
  public integerDivide(right: PSIChar): PSIChar {
    throw new Error('Cannot execute this operator with the PSIChar type');
  }
  public mod(right: PSIChar): PSIChar {
    throw new Error('Cannot execute this operator with the PSIChar type');
  }
  public equals(right: PSIChar): boolean {
    return this.value == right.value;
  }
  public lessThan(right: PSIChar): boolean {
    return this.value < right.value;
  }
  public greaterThan(right: PSIChar): boolean {
    return this.value > right.value;
  }
  public lessEqualsThan(right: PSIChar): boolean {
    return this.value <= right.value;
  }
  public greaterEqualsThan(right: PSIChar): boolean {
    return this.value >= right.value;
  }
  public unaryPlus(): PSIDataType {
    throw new Error('Cannot execute this operator with the PSIChar type');
  }
  public unaryMinus(): PSIDataType {
    throw new Error('Cannot execute this operator with the PSIChar type');
  }
}
