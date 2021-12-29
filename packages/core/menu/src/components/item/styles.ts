import { CSSObject, keyframes } from '@emotion/react';
import { skeleton as skeletonColor, subtleHeading } from '@uidu/theme/colors';
import {
  borderRadius,
  gridSize as gridSizeFn,
  skeletonShimmer,
} from '@uidu/theme/constants';
import { headingSizes } from '@uidu/theme/typography';
import { Width } from '../types';

const gridSize = gridSizeFn();

const itemElemSpacing = gridSize * 1.5;
const itemExpectedElemSize = gridSize * 3;
const itemTopBottomPadding = gridSize;
const itemSidePadding = gridSize * 2.5;
const itemMinHeight = 38;

const itemHeadingContentHeight = headingSizes.h100.lineHeight;
const itemHeadingFontSize = headingSizes.h100.size;

const skeletonItemElemSize = gridSize * 2.5;
const itemElemSkeletonOffset =
  (itemExpectedElemSize - skeletonItemElemSize) / 2;
const skeletonTextBorderRadius = 4;
const skeletonHeadingHeight = 16;
const skeletonContentHeight = 14;

const shimmer = skeletonShimmer();
const shimmerKeyframes = keyframes(shimmer.keyframes);

export const itemHeadingCSS = {
  textTransform: 'uppercase',
  fontSize: itemHeadingFontSize,
  lineHeight: itemHeadingContentHeight / itemHeadingFontSize,
  fontWeight: 700,
  color: subtleHeading(),
  padding: `0 ${itemSidePadding}px`,
} as CSSObject;

export const skeletonHeadingItemCSS = (
  width?: Width,
  isShimmering?: boolean,
): CSSObject => ({
  ...itemHeadingCSS,
  '&::after': {
    // This renders the skeleton heading "text".
    backgroundColor: skeletonColor(),
    ...(isShimmering && {
      ...shimmer.css,
      animationName: `${shimmerKeyframes}`,
    }),
    height: skeletonHeadingHeight,
    width: width || '30%',
    borderRadius: skeletonTextBorderRadius,
    display: 'block',
    content: '""',
  },
});

export const itemSkeletonCSS = (
  hasAvatar?: boolean,
  hasIcon?: boolean,
  width?: string | number,
  isShimmering?: boolean,
): CSSObject => ({
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  minHeight: itemMinHeight,

  // Stagger alternate skeleton items if no width is passed
  ...(!width && {
    '&:nth-child(1n)::after': {
      flexBasis: '70%',
    },
    '&:nth-child(2n)::after': {
      flexBasis: '50%',
    },
    '&:nth-child(3n)::after': {
      flexBasis: '60%',
    },
    '&:nth-child(4n)::after': {
      flexBasis: '90%',
    },
    '&:nth-child(5n)::after': {
      flexBasis: '35%',
    },
    '&:nth-child(6n)::after': {
      flexBasis: '77%',
    },
  }),

  ...((hasAvatar || hasIcon) && {
    '&::before': {
      // This will render a skeleton in the "elemBefore" position.
      content: '""',
      backgroundColor: skeletonColor(),
      ...(isShimmering && {
        ...shimmer.css,
        animationName: `${shimmerKeyframes}`,
      }),
      marginRight: '0.75rem',
      width: 24,
      height: 24,
      marginLeft: itemElemSkeletonOffset,
      borderRadius: hasAvatar ? '100%' : borderRadius(),
      flexShrink: 0,
    },
  }),

  '&::after': {
    // This will render the skeleton "text".
    content: '""',
    backgroundColor: skeletonColor(),
    ...(isShimmering && {
      ...shimmer.css,
      animationName: `${shimmerKeyframes}`,
    }),
    // This is a little bespoke but we need to push everything down 1px
    //  because the skeleton content should align to the bottom of the text.
    // Confirm VR test failures before accepting a change.
    marginTop: 1,
    height: skeletonContentHeight,
    borderRadius: skeletonTextBorderRadius,
    flexBasis: width || '100%',
  },
});
