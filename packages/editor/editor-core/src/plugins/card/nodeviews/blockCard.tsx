import MediaCard from '@uidu/media-card';
import * as PropTypes from 'prop-types';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import * as React from 'react';
import { stateKey as ReactNodeViewState } from '../../../plugins/base/pm-plugins/react-nodeview';

export interface Props {
  children?: React.ReactNode;
  node: PMNode;
  getPos: () => number;
  view: EditorView;
  selected?: boolean;
  pluginState: any;
}

class BlockCardNode extends React.Component<Props, {}> {
  onClick = () => {};

  static contextTypes = {
    contextAdapter: PropTypes.object,
  };

  render() {
    const { node, selected } = this.props;
    const { url, data } = node.attrs;

    const cardContext = this.context.contextAdapter
      ? this.context.contextAdapter.card
      : undefined;

    // render an empty span afterwards to get around Webkit bug
    // that puts caret in next editable text element
    const cardInner = (
      <>
        <MediaCard
          file={{
            id: 'foo',
            filename: 'devo toglierle',
            src: url,
            kind: 'smart',
            createdAt: Date(),
            extension: 'png',
          }}
          // data={data}
          // appearance="inline"
          // isSelected={selected}
          onClick={this.onClick}
          // container={this.scrollContainer}
        />
        <span contentEditable={true} />
      </>
    );

    return (
      <div>
        {cardContext ? (
          <cardContext.Provider value={cardContext.value}>
            {cardInner}
          </cardContext.Provider>
        ) : (
          cardInner
        )}
      </div>
    );
  }
}

export default class WrappedInline extends React.PureComponent<Props, {}> {
  render() {
    return (
      <BlockCardNode
        {...this.props}
        pluginState={ReactNodeViewState.getState(this.props.view.state)}
      />
    );
  }
}
