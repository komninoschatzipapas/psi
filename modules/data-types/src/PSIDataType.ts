interface PSIDataType {
  add(right: PSIDataType): PSIDataType;
  subtract(right: PSIDataType): PSIDataType;
  multiply(right: PSIDataType): PSIDataType;
  divide(right: PSIDataType): PSIDataType;
  integerDivide(right: PSIDataType): PSIDataType;
  mod(right: PSIDataType): PSIDataType;
  equals(right: PSIDataType): boolean;
  notEquals(right: PSIDataType): boolean;
  lessThan(right: PSIDataType): boolean;
  greaterThan(right: PSIDataType): boolean;
  lessEqualsThan(right: PSIDataType): boolean;
  greaterEqualsThan(right: PSIDataType): boolean;
  unaryPlus(): PSIDataType;
  unaryMinus(): PSIDataType;
}

abstract class PSIDataType {
  constructor(..._: any[]) {}

  public static defaultValue?: PSIDataType;

  public static treatAs?: typeof PSIDataType;

  public static isSubrangeType = false;
  public static isArrayType = false;
  public isArray = false;
  public isSubrange = false;

  public promote?: Map<typeof PSIDataType, () => PSIDataType>;

  public static promotable?: (typeof PSIDataType)[];
}

export default PSIDataType;
