// @flow

import type { ElementConfig } from 'react';
import Item from '../../presentational/Item';

export type SortableItemProps = {
  ...$Exact<ElementConfig<typeof Item>>,
  /** The index of the sortable item within it's group, used for sorting. */
  index: number,
  /** A unique identifier to identify what item it is, used as the draggableId
   *  for drag and drop. Also used for analytics.
   */
  id: string,
};
