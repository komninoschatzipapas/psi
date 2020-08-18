import { PSIDataType } from './PSIDataTypes';

export default class PSIChar extends PSIDataType {
  private get valueInteger() {
    return this.value.charCodeAt(0);
  }

  constructor(private value: string) {
    super();
  }

  public serialize() {
    return this.value;
  }

  public equals(right: PSIChar): boolean {
    return this.value == right.value;
  }
  public notEquals(right: PSIChar): boolean {
    return this.value != right.value;
  }
  public lessThan(right: PSIChar): boolean {
    return this.valueInteger < right.valueInteger;
  }
  public greaterThan(right: PSIChar): boolean {
    return this.valueInteger > right.valueInteger;
  }
  public lessEqualsThan(right: PSIChar): boolean {
    return this.valueInteger <= right.valueInteger;
  }
  public greaterEqualsThan(right: PSIChar): boolean {
    return this.valueInteger >= right.valueInteger;
  }
}
