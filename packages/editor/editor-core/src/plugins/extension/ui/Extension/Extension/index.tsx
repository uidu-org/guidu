import {
  calcBreakoutWidth,
  overflowShadow,
  OverflowShadowProps,
} from '@uidu/editor-common';
import { Node as PmNode } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import * as React from 'react';
import { Component } from 'react';
import WithPluginState from '../../../../../ui/WithPluginState';
import { MacroProvider } from '../../../../macro';
import {
  pluginKey as widthPluginKey,
  WidthPluginState,
} from '../../../../width';
import ExtensionLozenge from '../Lozenge';
import { Overlay } from '../styles';
import { Content, ContentWrapper, Header, Wrapper } from './styles';

export interface Props {
  node: PmNode;
  macroProvider?: MacroProvider;
  handleContentDOMRef: (node: HTMLElement | null) => void;
  onSelectExtension: (hasBody: boolean) => void;
  children?: React.ReactNode;
  view: EditorView;
}

class Extension extends Component<Props & OverflowShadowProps, any> {
  private onSelectExtension = () => {
    const { onSelectExtension, node } = this.props;
    onSelectExtension(node.type.name === 'bodiedExtension');
  };

  render() {
    const {
      node,
      handleContentDOMRef,
      children,
      view,
      handleRef,
      shadowClassNames,
    } = this.props;

    const hasBody = node.type.name === 'bodiedExtension';
    const hasChildren = !!children;

    return (
      <WithPluginState
        editorView={view}
        plugins={{
          widthState: widthPluginKey,
        }}
        render={({
          widthState = { width: 0 },
        }: {
          widthState?: WidthPluginState;
        }) => {
          return (
            <Wrapper
              ref={handleRef}
              data-layout={node.attrs.layout}
              className={`extension-container ${shadowClassNames} ${
                hasBody ? '' : 'with-overlay'
              }`}
              style={{
                width: calcBreakoutWidth(node.attrs.layout, widthState.width),
              }}
            >
              <div
                className={`extension-overflow-wrapper ${
                  hasBody ? 'with-body' : ''
                }`}
              >
                <Overlay className="extension-overlay" />
                <Header
                  contentEditable={false}
                  onClick={this.onSelectExtension}
                  className={hasChildren ? 'with-children' : ''}
                >
                  <ExtensionLozenge node={node} />
                  {children}
                </Header>
                {hasBody && (
                  <ContentWrapper>
                    <Content
                      ref={handleContentDOMRef}
                      className="extension-content"
                    />
                  </ContentWrapper>
                )}
              </div>
            </Wrapper>
          );
        }}
      />
    );
  }
}

export default overflowShadow(Extension, {
  overflowSelector: '.extension-overflow-wrapper',
});
