export default abstract class AST {
  public readonly children: AST[] = [];
  public parent: AST|null = null;

  constructor() {
    this.children.push = (...items: AST[]) => {
      items.forEach((item) => item.parent = this);
      return Array.prototype.push.call(this.children, ...items);
    }
  }

  public replace(node: AST) {
    if(this.parent === null) {
      throw new Error('Invalid tree configuration');
    }
    const index = this.parent.children.findIndex((node) => node === this);

    if(index == -1) {
      throw new Error('Invalid tree configuration');
    }

    this.parent.children[index] = node;
    this.parent = null;
  }
}
