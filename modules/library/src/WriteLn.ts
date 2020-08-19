import {
  PSIDataType,
  serializeDataType,
  PSIProcedure,
  createPSIMultitype,
  PSIBoolean,
  PSIChar,
  PSIInteger,
  PSIReal,
} from '@pascal-psi/data-types';
import { ProcedureSymbol, VariableSymbol } from '@pascal-psi/symbol';

const dataType = new PSIProcedure((args: PSIDataType[]) => {
  process.stdout.write(serializeDataType(args[0]).toString() + '\n');
});

const symbol = new ProcedureSymbol('WRITELN', [
  new VariableSymbol(
    'x',
    createPSIMultitype(PSIBoolean, PSIChar, PSIInteger, PSIReal),
  ),
]);

export { dataType, symbol };
