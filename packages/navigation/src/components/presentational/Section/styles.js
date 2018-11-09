// @flow

import { colors, gridSize as gridSizeFn } from '@atlaskit/theme';

import type { ModeColors } from '../../../theme/types';
import type { SectionPresentationProps } from './types';

const gridSize = gridSizeFn();

const scrollHintHeight = 2;
const scrollHintSpacing = gridSize * 2;

const isGecko =
  typeof window !== 'undefined' &&
  window.navigator.userAgent.indexOf('Gecko') >= 0;
const isWebkit =
  typeof window !== 'undefined' &&
  window.navigator.userAgent.indexOf('AppleWebKit') >= 0;
const scrollBarSize = isGecko || isWebkit ? 0 : 30;

const getBaseStyles = ({ alwaysShowScrollHint }: SectionPresentationProps) => ({
  wrapper: {
    height: '100%',
    overflow: 'hidden',
    position: 'relative',
    width: '100%',

    '&::before': {
      borderRadius: 1,
      content: "''",
      display: 'block',
      flex: 0,
      height: `${scrollHintHeight}px`,
      left: `${scrollHintSpacing}px`,
      position: 'absolute',
      right: `${scrollHintSpacing + scrollBarSize}px`,
      top: 0,
      zIndex: 1,
    },
  },
  inner: {
    flexBasis: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    overflowY: 'auto',
    paddingTop: 2,
    position: 'relative',

    '&::before': {
      borderRadius: 1,
      content: "''",
      display: alwaysShowScrollHint ? 'none' : 'block',
      flexShrink: 0,
      height: `${scrollHintHeight}px`,
      left: `${scrollHintSpacing}px`,
      position: 'absolute',
      right: `${scrollHintSpacing}px`,
      top: 0,
      zIndex: 2,
    },
  },
  // These styles are passed to the children function for the consumer to
  // apply
  children: {
    boxSizing: 'border-box',
    paddingLeft: `${gridSize * 2}px`,
    paddingRight: `${gridSize * 2}px`,
  },
});

export default ({ product }: ModeColors) => (
  props: SectionPresentationProps,
) => {
  const baseStyles = getBaseStyles(props);
  return {
    container: {
      ...baseStyles,
      wrapper: {
        ...baseStyles.wrapper,
        '&::before': {
          ...baseStyles.wrapper['&::before'],
          backgroundColor: colors.N30A,
        },
      },
      inner: {
        ...baseStyles.inner,
        '&::before': {
          ...baseStyles.inner['&::before'],
          backgroundColor: colors.N20,
        },
      },
    },
    product: {
      ...baseStyles,
      wrapper: {
        ...baseStyles.wrapper,
        '&::before': {
          ...baseStyles.wrapper['&::before'],
          backgroundColor: product.background.static,
        },
      },
      inner: {
        ...baseStyles.inner,
        '&::before': {
          ...baseStyles.inner['&::before'],
          backgroundColor: product.background.default,
        },
      },
    },
  };
};
