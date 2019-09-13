import { PSIDataType } from './PSIDataTypes';

export default class PSIProcedure extends PSIDataType {
  constructor(public readonly call: (args: PSIDataType[]) => void) {
    super();
  }

  public add(right: PSIDataType): PSIDataType {
    throw new Error('Cannot execute operations with procedure type');
  }
  public subtract(right: PSIDataType): PSIDataType {
    throw new Error('Cannot execute operations with procedure type');
  }
  public multiply(right: PSIDataType): PSIDataType {
    throw new Error('Cannot execute operations with procedure type');
  }
  public divide(right: PSIDataType): PSIDataType {
    throw new Error('Cannot execute operations with procedure type');
  }
  public integerDivide(right: PSIDataType): PSIDataType {
    throw new Error('Cannot execute operations with procedure type');
  }
  public mod(right: PSIDataType): PSIDataType {
    throw new Error('Cannot execute operations with procedure type');
  }
  public equals(right: PSIDataType): boolean {
    throw new Error('Cannot execute operations with procedure type');
  }
  public lessThan(right: PSIDataType): boolean {
    throw new Error('Cannot execute operations with procedure type');
  }
  public greaterThan(right: PSIDataType): boolean {
    throw new Error('Cannot execute operations with procedure type');
  }
  public lessEqualsThan(right: PSIDataType): boolean {
    throw new Error('Cannot execute operations with procedure type');
  }
  public greaterEqualsThan(right: PSIDataType): boolean {
    throw new Error('Cannot execute operations with procedure type');
  }
  public unaryPlus(): PSIDataType {
    throw new Error('Cannot execute operations with procedure type');
  }
  public unaryMinus(): PSIDataType {
    throw new Error('Cannot execute operations with procedure type');
  }
}
