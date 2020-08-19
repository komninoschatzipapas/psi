import PSISymbol from './PSISymbol';
import * as Types from '@pascal-psi/data-types';

export default class VariableSymbol extends PSISymbol {
  constructor(name: string, public readonly type: typeof Types.PSIDataType) {
    super(name);
  }
}
