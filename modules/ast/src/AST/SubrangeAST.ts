import TypeAST from './TypeAST';
import { ConstantAST } from '.';

export default class SubrangeAST extends TypeAST {
  constructor(
    public readonly left: ConstantAST,
    public readonly right: ConstantAST,
  ) {
    super();
  }
}
