import {
  PSIDataType,
  serializeDataType,
  PSIProcedure,
  createPSIMultitype,
  PSIBoolean,
  PSIChar,
  PSIInteger,
  PSIReal,
} from 'data-types';
import { ProcedureSymbol, VariableSymbol } from 'symbol';

const dataType = new PSIProcedure((args: PSIDataType[]) => {
  process.stdout.write(serializeDataType(args[0]).toString());
});

const symbol = new ProcedureSymbol('WRITE', [
  new VariableSymbol(
    'x',
    createPSIMultitype(PSIBoolean, PSIChar, PSIInteger, PSIReal),
  ),
]);

export { dataType, symbol };
