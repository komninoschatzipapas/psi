import {AST} from '.';

export default class CompoundAST extends AST {
  constructor(children: AST[]) {
    super();
    this.addChild(...children);
  }
}
