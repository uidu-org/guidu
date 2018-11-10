// @flow

import type { StyleReducer, ProductTheme } from '../../../theme/types';

export type ConnectedSkeletonItemProps = {
  hasBefore: boolean,
  styles: StyleReducer,
};

export type SkeletonItemProps = ConnectedSkeletonItemProps & {
  theme: ProductTheme,
};
