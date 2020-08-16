import { ConstantAST } from '.';
import { PSIBoolean } from 'data-types';

export default class FalseConstantAST extends ConstantAST {
  public readonly value = new PSIBoolean(false);
  dataType = PSIBoolean;
}
