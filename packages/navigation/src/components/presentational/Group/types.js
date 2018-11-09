// @flow

import type { Node } from 'react';

export type GroupProps = {
  /** Elements to render inside this group. */
  children: Node,
  /** Whether to render a Separator after the group. */
  hasSeparator: boolean,
  /** A heading to render before the group. */
  heading: Node,
  /** A unique identifier for the group. Used for analytics. */
  id?: string,
};
