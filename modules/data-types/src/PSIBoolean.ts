import PSIDataType from './PSIDataType';

export default class PSIBoolean extends PSIDataType {
  public static readonly true: PSIBoolean = new PSIBoolean(true);
  public static readonly false: PSIBoolean = new PSIBoolean(false);

  constructor(private readonly value: boolean) {
    super();
    if (value == true) {
      return PSIBoolean.true;
    } else {
      return PSIBoolean.false;
    }
  }

  public add(right: PSIDataType): PSIDataType {
    throw new Error('Cannot execute operation with boolean type');
  }
  public subtract(right: PSIDataType): PSIDataType {
    throw new Error('Cannot execute operation with boolean type');
  }
  public multiply(right: PSIDataType): PSIDataType {
    throw new Error('Cannot execute operation with boolean type');
  }
  public divide(right: PSIDataType): PSIDataType {
    throw new Error('Cannot execute operation with boolean type');
  }
  public integerDivide(right: PSIDataType): PSIDataType {
    throw new Error('Cannot execute operation with boolean type');
  }
  public mod(right: PSIDataType): PSIDataType {
    throw new Error('Cannot execute operation with boolean type');
  }
  public equals(right: PSIBoolean): boolean {
    return this.value == right.value;
  }
  public lessThan(right: PSIDataType): boolean {
    throw new Error('Cannot execute operation with boolean type');
  }
  public greaterThan(right: PSIDataType): boolean {
    throw new Error('Cannot execute operation with boolean type');
  }
  public lessEqualsThan(right: PSIDataType): boolean {
    throw new Error('Cannot execute operation with boolean type');
  }
  public greaterEqualsThan(right: PSIDataType): boolean {
    throw new Error('Cannot execute operation with boolean type');
  }
  public unaryPlus(): PSIDataType {
    throw new Error('Cannot execute operation with boolean type');
  }
  public unaryMinus(): PSIDataType {
    throw new Error('Cannot execute operation with boolean type');
  }
}
