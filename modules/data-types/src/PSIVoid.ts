import { PSIDataType } from './PSIDataTypes';

export default class PSIVoid extends PSIDataType {
  public add(right: PSIDataType): PSIDataType {
    throw new Error('Cannot execute operations with void type');
  }
  public subtract(right: PSIDataType): PSIDataType {
    throw new Error('Cannot execute operations with void type');
  }
  public multiply(right: PSIDataType): PSIDataType {
    throw new Error('Cannot execute operations with void type');
  }
  public divide(right: PSIDataType): PSIDataType {
    throw new Error('Cannot execute operations with void type');
  }
  public integerDivide(right: PSIDataType): PSIDataType {
    throw new Error('Cannot execute operations with void type');
  }
  public mod(right: PSIDataType): PSIDataType {
    throw new Error('Cannot execute operations with void type');
  }
  public equals(right: PSIDataType): boolean {
    throw new Error('Cannot execute operations with void type');
  }
  public lessThan(right: PSIDataType): boolean {
    throw new Error('Cannot execute operations with void type');
  }
  public greaterThan(right: PSIDataType): boolean {
    throw new Error('Cannot execute operations with void type');
  }
  public lessEqualsThan(right: PSIDataType): boolean {
    throw new Error('Cannot execute operations with void type');
  }
  public greaterEqualsThan(right: PSIDataType): boolean {
    throw new Error('Cannot execute operations with void type');
  }
  public unaryPlus(): PSIDataType {
    throw new Error('Cannot execute operations with void type');
  }
  public unaryMinus(): PSIDataType {
    throw new Error('Cannot execute operations with void type');
  }
}
