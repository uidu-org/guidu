// @flow

import type { ComponentType } from 'react';

export type ContentNavigationProps = {
  container?: ?ComponentType<{}>,
  isPeekHinting: boolean,
  isPeeking: boolean,
  isVisible: boolean,
  product: ComponentType<{}>,
};
