import PSISymbol from './PSISymbol';
import * as Types from 'data-types';

export default class VariableSymbol extends PSISymbol {
  constructor(name: string, public readonly type: typeof Types.PSIDataType) {
    super(name);
  }
}
