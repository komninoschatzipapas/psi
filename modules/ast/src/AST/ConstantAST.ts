import { AST } from '.';
import { PSIDataType } from '@pascal-psi/data-types';

export default abstract class ConstantAST extends AST {
  public abstract readonly value: PSIDataType;
  public abstract dataType?: typeof PSIDataType;
}
