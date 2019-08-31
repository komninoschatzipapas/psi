import {AST} from '.';

export default class RepeatAST extends AST {
  constructor(
    public readonly condition: AST,
    public readonly statements: AST[]
  ) {
    super();
    this.addChild(condition, ...statements);
  }
}
