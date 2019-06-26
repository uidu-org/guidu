import { ProviderFactory } from '@uidu/editor-common';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView, NodeView } from 'prosemirror-view';
import * as React from 'react';
import InlineNodeWrapper, { createMobileInlineDomRef } from '../../../components/InlineNodeWrapper';
import { PortalProviderAPI } from '../../../components/PortalProvider';
import { getPosHandler, ReactNodeView } from '../../../nodeviews';
import { EditorAppearance } from '../../../types';
import { ZeroWidthSpace } from '../../../utils';
import Emoji from '../ui/Emoji';

export interface Props {
  providerFactory: ProviderFactory;
  editorAppearance?: EditorAppearance;
}

export class EmojiNodeView extends ReactNodeView {
  createDomRef() {
    if (this.reactComponentProps.editorAppearance === 'mobile') {
      return createMobileInlineDomRef();
    }

    return super.createDomRef();
  }

  render(props: Props) {
    const { providerFactory, editorAppearance } = props;
    const { shortName, id, text } = this.node.attrs;

    return (
      <InlineNodeWrapper appearance={editorAppearance}>
        <Emoji
          providers={providerFactory}
          id={id}
          shortName={shortName}
          fallback={text}
        />
        {editorAppearance !== 'mobile' && ZeroWidthSpace}
      </InlineNodeWrapper>
    );
  }
}

export default function emojiNodeView(
  portalProviderAPI: PortalProviderAPI,
  providerFactory: ProviderFactory,
  editorAppearance?: EditorAppearance,
) {
  return (node: PMNode, view: EditorView, getPos: getPosHandler): NodeView =>
    new EmojiNodeView(node, view, getPos, portalProviderAPI, {
      providerFactory,
      editorAppearance,
    }).init();
}
