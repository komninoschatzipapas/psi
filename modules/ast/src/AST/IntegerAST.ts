import TypeAST from './TypeAST';
import { PSIInteger } from '@pascal-psi/data-types';

export default class IntegerAST extends TypeAST {
  dataType = PSIInteger;
}
