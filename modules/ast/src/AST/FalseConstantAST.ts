import { ConstantAST } from '.';
import { PSIBoolean } from '@pascal-psi/data-types';

export default class FalseConstantAST extends ConstantAST {
  public readonly value = new PSIBoolean(false);
  dataType = PSIBoolean;
}
