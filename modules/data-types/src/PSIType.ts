import { PSIDataType } from './PSIDataTypes';

export default abstract class PSIType extends PSIDataType {
  public add(right: PSIDataType): PSIDataType {
    throw new Error('Cannot execute operations with type type');
  }
  public subtract(right: PSIDataType): PSIDataType {
    throw new Error('Cannot execute operations with type type');
  }
  public multiply(right: PSIDataType): PSIDataType {
    throw new Error('Cannot execute operations with type type');
  }
  public divide(right: PSIDataType): PSIDataType {
    throw new Error('Cannot execute operations with type type');
  }
  public integerDivide(right: PSIDataType): PSIDataType {
    throw new Error('Cannot execute operations with type type');
  }
  public mod(right: PSIDataType): PSIDataType {
    throw new Error('Cannot execute operations with type type');
  }
  public equals(right: PSIDataType): boolean {
    throw new Error('Cannot execute operations with type type');
  }
  public lessThan(right: PSIDataType): boolean {
    throw new Error('Cannot execute operations with type type');
  }
  public greaterThan(right: PSIDataType): boolean {
    throw new Error('Cannot execute operations with type type');
  }
  public lessEqualsThan(right: PSIDataType): boolean {
    throw new Error('Cannot execute operations with type type');
  }
  public greaterEqualsThan(right: PSIDataType): boolean {
    throw new Error('Cannot execute operations with type type');
  }
  public unaryPlus(): PSIDataType {
    throw new Error('Cannot execute operations with type type');
  }
  public unaryMinus(): PSIDataType {
    throw new Error('Cannot execute operations with type type');
  }
}
