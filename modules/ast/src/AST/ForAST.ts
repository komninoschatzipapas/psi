import { AST } from '.';
import { AssignmentAST } from '.';

export default class ForAST extends AST {
  constructor(
    public readonly assignment: AssignmentAST,
    public readonly increment: boolean,
    public readonly finalValue: AST,
    public readonly statement: AST,
  ) {
    super();
    this.addChild(assignment, finalValue, statement);
  }
}
