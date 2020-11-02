/** @jsxImportSource @emotion/core */
import { CSSObject } from '@emotion/core';
import React from 'react';
import { SkeletonHeadingItemProps } from '../types';
import { skeletonHeadingItemCSS } from './styles';

const SkeletonHeadingItem = ({
  width,
  testId,
  isShimmering,
  cssFn = (currentStyles: CSSObject) => currentStyles,
}: SkeletonHeadingItemProps) => (
  <div
    css={cssFn(skeletonHeadingItemCSS(width, isShimmering), undefined)}
    data-ds--menu--skeleton-heading-item
    data-testid={testId}
  />
);

export default SkeletonHeadingItem;
