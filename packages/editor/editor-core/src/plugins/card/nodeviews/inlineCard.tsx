import { findOverflowScrollParent } from '@uidu/editor-common';
import MediaCard from '@uidu/media-card';
import * as PropTypes from 'prop-types';
import rafSchedule from 'raf-schd';
import * as React from 'react';
import { SelectionBasedNodeView } from '../../../nodeviews/ReactNodeView';
import UnsupportedInlineNode from '../../unsupported-content/nodeviews/unsupported-inline';
import { registerCard } from '../pm-plugins/actions';
import { Card, SmartCardProps } from './genericCard';

export class InlineCardComponent extends React.PureComponent<SmartCardProps> {
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

  onResolve = (data: { url?: string; title?: string }) => {
    const { getPos, view } = this.props;
    if (!getPos) {
      return;
    }

    const { title, url } = data;

    // don't dispatch immediately since we might be in the middle of
    // rendering a nodeview
    rafSchedule(() =>
      view.dispatch(
        registerCard({
          title,
          url,
          pos: typeof getPos === 'function' ? getPos() : +getPos,
        })(view.state.tr),
      ),
    )();
  };

  render() {
    const { node, selected, cardContext } = this.props;
    const { url, data } = node.attrs;

    const card = (
      <span>
        <span className="card">
          <MediaCard
            file={{
              id: 'test',
              type: 'image',
              url,
              metadata: {
                size: 3000,
              },
            }}
            // data={data}
            // appearance="inline"
            // isSelected={selected}
            onClick={this.onClick}
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

const WrappedInlineCard = Card(InlineCardComponent, UnsupportedInlineNode);

export class InlineCard extends SelectionBasedNodeView {
  render() {
    return (
      <WrappedInlineCard
        node={this.node}
        selected={this.insideSelection()}
        view={this.view}
        getPos={this.getPos}
      />
    );
  }
}
