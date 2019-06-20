import { Card } from '@uidu/smart-card';
import * as PropTypes from 'prop-types';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import * as React from 'react';
import wrapComponentWithClickArea from '../../../nodeviews/legacy-nodeview-factory/ui/wrapper-click-area';
import { stateKey as ReactNodeViewState } from '../../../plugins/base/pm-plugins/react-nodeview';

export interface Props {
  children?: React.ReactNode;
  node: PMNode;
  getPos: () => number;
  view: EditorView;
  selected?: boolean;
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
        <Card
          url={url}
          data={data}
          appearance="block"
          isSelected={selected}
          onClick={this.onClick}
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

const ClickableBlockCard = wrapComponentWithClickArea(BlockCardNode);
export default class WrappedInline extends React.PureComponent<Props, {}> {
  render() {
    return (
      <ClickableBlockCard
        {...this.props}
        pluginState={ReactNodeViewState.getState(this.props.view.state)}
      />
    );
  }
}
