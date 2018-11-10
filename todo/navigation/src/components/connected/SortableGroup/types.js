// @flow

import type { ElementConfig } from 'react';
import Group from '../../presentational/Group';

export type SortableGroupProps = {
  ...$Exact<ElementConfig<typeof Group>>,
  /** A unique identifier for the group that will be used as the droppableId for drag and drop. Also used for analytics. */
  id: string,
  /** Styling to apply to the DroppableGroup.
   */
  innerStyle?: { [cssProp: string]: any },
};
