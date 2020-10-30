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
  PSIFunction,
  PSIFunctionType,
} from './PSIDataTypes';

export default function printType(type: typeof PSIDataType): string {
  if (type && type.multitype) return type.multitype.map(printType).join(' or ');
  else if (type && type.isArrayType) return `Array`;
  else if (type === PSIBoolean) return 'Boolean';
  else if (type === PSIBooleanType) return 'Boolean Type';
  else if (type === PSIChar) return 'Char';
  else if (type === PSICharType) return 'Char Type';
  else if (type === PSIInteger) return 'Integer';
  else if (type === PSIIntegerType) return 'Integer Type';
  else if (type === PSIProcedure) return 'Procedure';
  else if (type === PSIProcedureType) return 'Procedure Type';
  else if (type === PSIFunction) return 'Function';
  else if (type === PSIFunctionType) return 'Function Type';
  else if (type === PSIReal) return 'Real';
  else if (type === PSIRealType) return 'Real Type';
  else if (type && type.isSubrangeType)
    return `Subrange Of ${printType(type.treatAs!)}`;
  else if (type === PSIVoid) return 'Void';
  else return `Unknown`;
}
