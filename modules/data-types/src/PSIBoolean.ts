import PSIDataType from './PSIDataType';

export default class PSIBoolean extends PSIDataType {
  public static readonly true: PSIBoolean = new PSIBoolean(true);
  public static readonly false: PSIBoolean = new PSIBoolean(false);

  constructor(private readonly value: boolean) {
    super();
    if (value === true) {
      return PSIBoolean.true;
    } else {
      return PSIBoolean.false;
    }
  }

  public serialize() {
    return this.value;
  }

  public equals(right: PSIBoolean): boolean {
    return this.value == right.value;
  }

  public notEquals(right: PSIBoolean): boolean {
    return this.value != right.value;
  }
}
