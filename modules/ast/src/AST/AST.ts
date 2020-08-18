import { DebugInfoProvider } from 'error';
import { PSIDataType } from 'data-types';

export default abstract class AST extends DebugInfoProvider {
  constructor(..._: any[]) {
    super();
  }

  public promote?: Map<typeof PSIDataType, () => AST>;

  protected readonly _children: AST[] = [];
  public parent: AST | null = null;

  get children() {
    return this._children;
  }

  public addChild(...children: AST[]) {
    children.forEach(child => {
      child.parent = this;
      this._children.push(child);
    });
  }
}
