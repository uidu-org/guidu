// @flow

import type { Node } from 'react';

import type { ProductTheme, StyleReducer } from '../../../theme/types';

export type ScrollableSectionInnerProps = {
  children: Node,
  theme: ProductTheme,
  styles: StyleReducer,
};
