import { ExtensionHandlers, ProviderFactory } from '@atlaskit/editor-common';
import { Node as PmNode } from 'prosemirror-model';
import { EditorView, NodeView } from 'prosemirror-view';
import * as React from 'react';
import { PortalProviderAPI } from '../../../components/PortalProvider';
import { ReactNodeView } from '../../../nodeviews';
import { ForwardRef } from '../../../nodeviews/ReactNodeView';
import { ZeroWidthSpace } from '../../../utils';
import Extension from '../ui/Extension';

export interface Props {
  node: PmNode;
  providerFactory: ProviderFactory;
  view: EditorView;
}

class ExtensionNode extends ReactNodeView {
  ignoreMutation(mutation: MutationRecord) {
    // Extensions can perform async operations that will change the DOM.
    // To avoid having their tree rebuilt, we need to ignore the mutation
    // if its not a layout, we need to give children a chance to recalc
    return mutation.attributeName !== 'data-layout';
  }

  getContentDOM() {
    if (this.node.isInline) {
      return undefined;
    }

    const dom = document.createElement('div');
    dom.className = `${this.node.type.name}-content-dom-wrapper`;
    return { dom };
  }

  render(
    props: {
      providerFactory: ProviderFactory;
      extensionHandlers: ExtensionHandlers;
    },
    forwardRef: ForwardRef,
  ) {
    return (
      <span>
        <Extension
          editorView={this.view}
          node={this.node}
          providerFactory={props.providerFactory}
          handleContentDOMRef={forwardRef}
          extensionHandlers={props.extensionHandlers}
        />
        {this.node.type.name === 'inlineExtension' && ZeroWidthSpace}
      </span>
    );
  }
}

export default function ExtensionNodeView(
  portalProviderAPI: PortalProviderAPI,
  providerFactory: ProviderFactory,
  extensionHandlers: ExtensionHandlers,
) {
  return (node: PmNode, view: EditorView, getPos: () => number): NodeView => {
    return new ExtensionNode(node, view, getPos, portalProviderAPI, {
      providerFactory,
      extensionHandlers,
    }).init();
  };
}
