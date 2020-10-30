import { AST } from '.';
import { PSIDataType } from '@pascal-psi/data-types';

export default abstract class TypeAST extends AST {
  public abstract dataType: typeof PSIDataType;
}
