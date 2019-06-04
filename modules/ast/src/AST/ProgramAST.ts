import {AST} from '.';
import { BlockAST } from '.';

export default class ProgramAST extends AST {
  public readonly name: string;
  constructor(name: string, public block: BlockAST) {
    super();
    this.children.push(block);
    this.name = name;
  }
}
