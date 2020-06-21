import { PSIDataType } from './PSIDataTypes';

export default class PSIVoid extends PSIDataType {
  public add(right: PSIDataType): PSIVoid {
    throw new Error('Cannot execute operations with void type');
  }
  public subtract(right: PSIDataType): PSIVoid {
    throw new Error('Cannot execute operations with void type');
  }
  public multiply(right: PSIDataType): PSIVoid {
    throw new Error('Cannot execute operations with void type');
  }
  public divide(right: PSIDataType): PSIVoid {
    throw new Error('Cannot execute operations with void type');
  }
  public integerDivide(right: PSIDataType): PSIVoid {
    throw new Error('Cannot execute operations with void type');
  }
  public mod(right: PSIDataType): PSIVoid {
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
  public unaryPlus(): PSIVoid {
    throw new Error('Cannot execute operations with void type');
  }
  public unaryMinus(): PSIVoid {
    throw new Error('Cannot execute operations with void type');
  }
}
