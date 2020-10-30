import { PSIDataType } from './PSIDataTypes';

export default class PSIFunction extends PSIDataType {
  public returnValue: PSIDataType | null = null;

  constructor(public readonly call: (args: PSIDataType[]) => void) {
    super();
  }
}
