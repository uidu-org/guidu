// @flow
import React, { Children, Component, type Node, type Element } from 'react';
import {
  withAnalyticsEvents,
  withAnalyticsContext,
  createAndFireEvent,
} from '@atlaskit/analytics-next';
import {
  name as packageName,
  version as packageVersion,
} from '../../package.json';
import EllipsisItem from './EllipsisItem';
import Container from '../styled/BreadcrumbsContainer';

const defaultMaxItems = 8;

const { toArray } = Children;

type Props = {
  /** Override collapsing of the nav when there are more than maxItems */
  isExpanded?: boolean,
  /** Set the maximum number of breadcrumbs to display. When there are more
  than the maximum number, only the first and last will be shown, with an
  ellipsis in between. */
  maxItems?: number,
  /** A function to be called when you are in the collapsed view and click
   the ellpisis. */
  onExpand: Event => mixed,
  /** A single <BreadcrumbsItem> or an array of <BreadcrumbsItem>.  */
  children?: Node,
  /** If max items is exceeded, the number of items to show before the ellipsis */
  itemsBeforeCollapse: number,
  /** If max items is exceeded, the number of items to show after the ellipsis */
  itemsAfterCollapse: number,
};

class BreadcrumbsStateless extends Component<Props, {}> {
  static defaultProps = {
    isExpanded: false,
    children: null,
    maxItems: defaultMaxItems,
    itemsBeforeCollapse: 1,
    itemsAfterCollapse: 1,
  };

  renderAllItems(): Array<Element<*>> {
    const allNonEmptyItems = toArray(this.props.children);
    return allNonEmptyItems.map((child, index) =>
      React.cloneElement(child, {
        hasSeparator: index < allNonEmptyItems.length - 1,
      }),
    );
  }

  renderItemsBeforeAndAfter() {
    const { itemsBeforeCollapse, itemsAfterCollapse } = this.props;
    const allItems = this.renderAllItems();
    // This defends against someone passing weird data, to ensure that if all
    // items would be shown anyway, we just show all items without the EllipsisItem
    if (itemsBeforeCollapse + itemsAfterCollapse >= allItems.length) {
      return allItems;
    }

    const beforeItems = allItems.slice(0, itemsBeforeCollapse);
    const afterItems = allItems.slice(
      allItems.length - itemsAfterCollapse,
      allItems.length,
    );

    return [
      ...beforeItems,
      <EllipsisItem
        hasSeparator={itemsAfterCollapse > 0}
        key="ellipsis"
        onClick={this.props.onExpand}
      />,
      ...afterItems,
    ];
  }

  render() {
    const { children, isExpanded, maxItems } = this.props;
    if (!children) return <Container />;
    return (
      <Container>
        {isExpanded || (maxItems && toArray(children).length <= maxItems)
          ? this.renderAllItems()
          : this.renderItemsBeforeAndAfter()}
      </Container>
    );
  }
}

export { BreadcrumbsStateless as BreadcrumbsStatelessWithoutAnalytics };
const createAndFireEventOnAtlaskit = createAndFireEvent('atlaskit');

export default withAnalyticsContext({
  componentName: 'breadcrumbs',
  packageName,
  packageVersion,
})(
  withAnalyticsEvents({
    onExpand: createAndFireEventOnAtlaskit({
      action: 'expanded',
      actionSubject: 'breadcrumbs',

      attributes: {
        componentName: 'breadcrumbs',
        packageName,
        packageVersion,
      },
    }),
  })(BreadcrumbsStateless),
);
