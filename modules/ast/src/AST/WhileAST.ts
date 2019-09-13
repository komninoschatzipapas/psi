import { AST } from '.';

export default class WhileAST extends AST {
  constructor(public readonly condition: AST, public readonly statement: AST) {
    super();
    this.addChild(condition, statement);
  }
}
