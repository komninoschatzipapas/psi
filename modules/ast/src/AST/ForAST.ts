import { AST } from '.';
import { AssignmentAST } from '.';
import * as Types from '@pascal-psi/data-types';

export default class ForAST extends AST {
  constructor(
    public readonly assignment: AssignmentAST,
    public readonly increment: Types.PSIBoolean,
    public readonly finalValue: AST,
    public readonly statement: AST,
  ) {
    super();
    this.addChild(assignment, finalValue, statement);
  }
}
