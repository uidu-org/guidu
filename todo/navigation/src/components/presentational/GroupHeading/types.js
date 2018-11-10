// @flow

import type { ComponentType, Node } from 'react';

import type { ProductTheme } from '../../../theme/types';

export type ConnectedGroupHeadingProps = {
  /** A component to render after the main content of the title. */
  after?: ComponentType<*>,
  /** Text content of the GroupHeading. */
  children: Node,
};

export type GroupHeadingProps = ConnectedGroupHeadingProps & {
  theme: ProductTheme,
};
