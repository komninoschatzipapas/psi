import PSISymbol from './PSISymbol';
import VariableSymbol from './VariableSymbol';
import * as Types from '@pascal-psi/data-types';

export default class FunctionSymbol extends PSISymbol {
  public readonly args: VariableSymbol[];

  constructor(
    name: string,
    args: VariableSymbol[],
    public readonly returnType: typeof Types.PSIDataType,
  ) {
    super(name);
    this.args = args;
  }
}
