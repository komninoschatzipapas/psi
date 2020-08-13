import {
  PSIDataType,
  PSIBoolean,
  PSIBooleanType,
  PSICharType,
  PSIInteger,
  PSIIntegerType,
  PSIChar,
  PSIProcedure,
  PSIProcedureType,
  PSIReal,
  PSIRealType,
  PSIVoid,
} from './PSIDataTypes';

export default function printType(
  type: new (..._: any[]) => PSIDataType,
): string {
  if (type === PSIBoolean) return 'Boolean';
  else if (type === PSIBooleanType) return 'BooleanType';
  else if (type === PSIChar) return 'Char';
  else if (type === PSICharType) return 'CharType';
  else if (type === PSIInteger) return 'Integer';
  else if (type === PSIIntegerType) return 'IntegerType';
  else if (type === PSIProcedure) return 'Procedure';
  else if (type === PSIProcedureType) return 'ProcedureType';
  else if (type === PSIReal) return 'Real';
  else if (type === PSIRealType) return 'RealType';
  else if ((type as any).isSubrangeType)
    return `Subrange(${printType((type as any).treatAs)})`;
  else if (type === PSIVoid) return 'Void';
  else throw new Error('Attempted to print unknown type');
}
