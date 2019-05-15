import ConstantAST from './ConstantAST';
import * as Types from 'data-types';
import ASTVisitor from '../ASTVisitor';

export default class IntegerConstantAST extends ConstantAST {
  public readonly value: Types.Integer;

  constructor(value: Types.Integer) {
    super();
    this.value = value;
  }
}
