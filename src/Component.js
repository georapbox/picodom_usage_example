import {patch} from 'picodom';

export class Component {
  constructor() {
    this.element = null;
    this.oldNode = null;
    this.rootNode = null;
  }

  render(rootNode) {
    const _render = newNode => this.element = patch(rootNode || this.rootNode, this.element, this.oldNode, this.oldNode = newNode);
    return _render(this.view ? this.view(this.state) : '');
  }
}
