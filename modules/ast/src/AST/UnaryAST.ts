import {AST} from '.';


export default abstract class UnaryAST extends AST {
  constructor(public target: AST) {
    super();
    this.children.push(target);
  }
}
