import { ConstantAST } from '.';
import { PSIBoolean } from 'data-types';

export default class TrueConstantAST extends ConstantAST {
  dataType = PSIBoolean;
  public readonly value = new PSIBoolean(true);
}
