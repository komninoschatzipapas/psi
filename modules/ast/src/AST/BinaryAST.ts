import { AST } from '.';

export default abstract class BinaryAST extends AST {
  private _left!: AST;
  private _right!: AST;

  public get left() {
    return this._left;
  }

  public set left(value: AST) {
    const indexOfCurrent = this._children.indexOf(this._left);
    if (indexOfCurrent !== -1) {
      this._children.splice(indexOfCurrent, 1);
    }
    this.addChild(value);
    this._left = value;
  }

  public get right() {
    return this._right;
  }

  public set right(value: AST) {
    const indexOfCurrent = this._children.indexOf(this._right);
    if (indexOfCurrent !== -1) {
      this._children.splice(indexOfCurrent, 1);
    }
    this.addChild(value);
    this._right = value;
  }

  constructor(left: AST, right: AST) {
    super();
    this.left = left;
    this.right = right;
  }
}
