import { AST } from '.';

export default class IfAST extends AST {
  public next: IfAST | AST | null = null;
  constructor(public readonly condition: AST, public readonly statement: AST) {
    super();
    this.addChild(condition, statement);
  }

  public addNext(next: IfAST | AST) {
    if (this.next) {
      throw new Error('Cannot add next if node more than once');
    }
    this.next = next;
  }
}
