import { AST } from ".";

export default class CallAST extends AST {
  constructor(public readonly name: string, public readonly args: AST[]) {
    super();
    this.addChild(...args);
  }
}