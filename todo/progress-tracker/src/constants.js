// @flow

import { gridSize } from '@atlaskit/theme';

export const defaultGridSize = gridSize();

/** Ideally these are exported by @atlaskit/page */
export const spacing = {
  comfortable: defaultGridSize * 5,
  cosy: defaultGridSize * 2,
  compact: defaultGridSize * 0.5,
};
