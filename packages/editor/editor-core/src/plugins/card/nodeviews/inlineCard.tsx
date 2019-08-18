import { findOverflowScrollParent } from '@uidu/editor-common';
import MediaCard from '@uidu/media-card';
import * as PropTypes from 'prop-types';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import * as React from 'react';
import wrapComponentWithClickArea from '../../../nodeviews/legacy-nodeview-factory/ui/wrapper-click-area';
import { stateKey as ReactNodeViewState } from '../../../plugins/base/pm-plugins/react-nodeview';
import { ZeroWidthSpace } from '../../../utils';

export interface Props {
  children?: React.ReactNode;
  node: PMNode;
  getPos: () => number;
  view: EditorView;
  selected?: boolean;
}

export class InlineCardNode extends React.PureComponent<Props> {
  private scrollContainer?: HTMLElement;
  private onClick = () => {};

  static contextTypes = {
    contextAdapter: PropTypes.object,
  };

  UNSAFE_componentWillMount() {
    const { view } = this.props;
    const scrollContainer = findOverflowScrollParent(view.dom as HTMLElement);
    this.scrollContainer = scrollContainer || undefined;
  }

  render() {
    const { node, selected } = this.props;
    const { url, data } = node.attrs;

    const cardContext = this.context.contextAdapter
      ? this.context.contextAdapter.card
      : undefined;

    const card = (
      <span>
        <span>{ZeroWidthSpace}</span>
        <span className="card">
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
        </span>
      </span>
    );

    return cardContext ? (
      <cardContext.Provider value={cardContext.value}>
        {card}
      </cardContext.Provider>
    ) : (
      card
    );
  }
}

const ClickableInlineCard = wrapComponentWithClickArea(InlineCardNode, true);

export default class WrappedInline extends React.PureComponent<Props, {}> {
  render() {
    return (
      <ClickableInlineCard
        {...this.props}
        pluginState={ReactNodeViewState.getState(this.props.view.state)}
      />
    );
  }
}
