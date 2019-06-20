import { Node as PMNode, DOMSerializer } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { TextSelection } from 'prosemirror-state';

export default class PlaceholderTextNode {
  dom: HTMLElement | undefined;
  view: EditorView;
  getPos: () => number;

  constructor(node: PMNode, view: EditorView, getPos: () => number) {
    this.view = view;
    this.getPos = getPos;
    this.dom = DOMSerializer.renderSpec(document, node.type.spec.toDOM!(node))
      .dom as HTMLElement;
    // Using `onclick` rather than `addEventListener` due to ED-3728
    this.dom.onclick = this.handleClick;
  }

  update = (node: PMNode) => {
    if (node.type !== node.type.schema.nodes.placeholder) {
      return false;
    }
    this.dom = DOMSerializer.renderSpec(document, node.type.spec.toDOM!(node))
      .dom as HTMLElement;
    this.dom.onclick = this.handleClick;
    return true;
  };

  destroy = () => {
    this.dom = undefined;
  };

  handleClick = (event: MouseEvent) => {
    const { state } = this.view;
    const pos = this.getPos();
    const selectionAtClick = TextSelection.create(state.tr.doc, pos);

    // In Firefox, clicking on the right-hand side of the span will place
    // the selection on the right-hand side of the node. We need to move
    // the selection to the left of this node in this case
    const { nodeBefore } = selectionAtClick.$anchor;
    if (
      nodeBefore &&
      nodeBefore.type === this.view.state.schema.nodes.placeholder &&
      this.view.domAtPos(pos).node === event.target
    ) {
      document.getSelection()!.removeAllRanges();
      // Find the nearest selection to the left to move the cursor to
      // TODO: [ts30] handle void and null properly
      const selectionToLeftOfClick = TextSelection.findFrom(
        selectionAtClick.$head,
        -1,
        true,
      ) as TextSelection;
      this.view.dispatch(state.tr.setSelection(selectionToLeftOfClick));
    } else {
      document.getSelection()!.removeAllRanges();
      this.view.dispatch(state.tr.setSelection(selectionAtClick));
    }
    return true;
  };
}
