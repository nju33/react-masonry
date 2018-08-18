import { MasonryChildProps, MasonryChildState } from '.';

export class Column {
  private _stack: React.Component<MasonryChildProps, MasonryChildState>[] = [];
  private _children: React.ReactNode[] = [];

  add(component: React.Component<MasonryChildProps, MasonryChildState>) {
    this._stack.push(component);
  }

  addChild(component: React.ReactNode) {
    this._children.push(component);
  }

  get height(): number {
    return this._stack.reduce((sum, component) => {
      return sum + component.state.height;
    }, 0);
  }

  get children() {
    return this._children;
  }
}
