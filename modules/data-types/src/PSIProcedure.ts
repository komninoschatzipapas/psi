import { PSIDataType } from './PSIDataTypes';

export default class PSIProcedure extends PSIDataType {
  constructor(public readonly call: (args: PSIDataType[]) => void) {
    super();
  }
}
