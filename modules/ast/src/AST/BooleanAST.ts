import TypeAST from './TypeAST';
import { PSIBoolean } from '@pascal-psi/data-types';

export default class BooleanAST extends TypeAST {
  dataType = PSIBoolean;
}
