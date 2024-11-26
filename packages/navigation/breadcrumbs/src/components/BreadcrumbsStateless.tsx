import React, { useCallback } from 'react';
import Container from '../styled/BreadcrumbsContainer';
import EllipsisItem from './EllipsisItem';

const defaultMaxItems = 8;

const { toArray } = React.Children;

export interface BreadcrumbsStatelessProps {
  /** Override collapsing of the nav when there are more than maxItems */
  isExpanded?: boolean;
  /** Set the maximum number of breadcrumbs to display. When there are more
  than the maximum number, only the first and last will be shown, with an
  ellipsis in between. */
  maxItems?: number;
  /** The items to be included inside the Breadcrumbs wrapper */
  children?: React.ReactNode;
  /** A function to be called when you are in the collapsed view and click
   the ellipsis. */
  onExpand?: (event: React.MouseEvent) => any;
  /** If max items is exceeded, the number of items to show before the ellipsis */
  itemsBeforeCollapse?: number;
  /** If max items is exceeded, the number of items to show after the ellipsis */
  itemsAfterCollapse?: number;
  /** A `testId` prop is provided for specified elements, which is a unique string that appears as a data attribute `data-testid` in the rendered code, serving as a hook for automated tests.
  In case of `testId` passed through EllipsisItem, the element will be identified like this: 'testId && `${testId}--breadcrumb-ellipsis'.
  This can be used to click the elements when they are collapsed. */
  testId?: string;
}

function BreadcrumbsStateless({
  isExpanded = false,
  maxItems = defaultMaxItems,
  itemsBeforeCollapse = 1,
  itemsAfterCollapse = 1,
  onExpand,
  children,
  testId,
}: BreadcrumbsStatelessProps) {
  const renderAllItems = useCallback((): Array<React.ReactNode> => {
    const allNonEmptyItems = toArray(children);
    return allNonEmptyItems.map((child, index) =>
      React.cloneElement(child as React.ReactElement, {
        hasSeparator: index < allNonEmptyItems.length - 1,
      }),
    );
  }, [children]);

  const renderItemsBeforeAndAfter = useCallback(() => {
    // Not a chance this will trigger, but TS is complaining about items* possibly being undefined.
    if (itemsBeforeCollapse === undefined || itemsAfterCollapse === undefined) {
      return undefined;
    }

    const allItems = renderAllItems();
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
        testId={testId && `${testId}--breadcrumb-ellipsis`}
        onClick={onExpand}
      />,
      ...afterItems,
    ];
  }, [
    onExpand,
    itemsAfterCollapse,
    itemsBeforeCollapse,
    renderAllItems,
    testId,
  ]);

  if (!children) {
    return <Container />;
  }
  return (
    <Container data-testid={testId}>
      {isExpanded || (maxItems && toArray(children).length <= maxItems)
        ? renderAllItems()
        : renderItemsBeforeAndAfter()}
    </Container>
  );
}

export { BreadcrumbsStateless };

export default BreadcrumbsStateless;
