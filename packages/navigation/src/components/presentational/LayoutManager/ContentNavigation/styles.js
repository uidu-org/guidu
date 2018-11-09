// @flow

import { colors } from '@atlaskit/theme';

import { CONTENT_NAV_WIDTH } from '../../../../common/constants';

import type { ModeColors } from '../../../../theme/types';

const baseStyles = {
  boxSizing: 'border-box',
  height: '100%',
  left: 0,
  minWidth: CONTENT_NAV_WIDTH,
  overflowX: 'hidden',
  position: 'absolute',
  top: 0,
  width: '100%',
  // Reset stacking context so scroll hints from the product nav don't sit above
  // container nav
  zIndex: 0,
};

export default ({ product }: ModeColors) => () => ({
  container: {
    ...baseStyles,
    backgroundColor: colors.N20,
    color: colors.N500,
  },
  product: {
    ...baseStyles,
    backgroundColor: product.background.default,
    color: product.text.default,
  },
});
