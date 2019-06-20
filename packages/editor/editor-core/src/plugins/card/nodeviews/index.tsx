import { Node } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { PortalProviderAPI } from '../../../components/PortalProvider';
import { ReactNodeView } from '../../../nodeviews';
import {
  getPosHandler,
  ReactComponentProps,
} from '../../../nodeviews/ReactNodeView';

export class CardNodeView extends ReactNodeView {
  static fromComponent(
    component: React.ComponentType<any>,
    portalProviderAPI: PortalProviderAPI,
    props?: ReactComponentProps,
  ) {
    return (node: Node, view: EditorView, getPos: getPosHandler) =>
      new CardNodeView(
        node,
        view,
        getPos,
        portalProviderAPI,
        props,
        component,
        true,
      ).init();
  }
}
