import PSISymbol from './PSISymbol';
import VariableSymbol from './VariableSymbol';

export default class ProcedureSymbol extends PSISymbol {
  public readonly args: VariableSymbol[];

  constructor(name: string, args: VariableSymbol[]) {
    super(name);
    this.args = args;
  }
}
