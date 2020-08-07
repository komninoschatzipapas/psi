import { ConstantAST } from '.';
import { PSIBoolean } from 'data-types';

export default class TrueAST extends ConstantAST {
  public readonly value = new PSIBoolean(true);
}
