import { ConstantAST } from '.';
import { PSIBoolean } from 'data-types';

export default class FalseAST extends ConstantAST {
  public readonly value = new PSIBoolean(false);
}
