/** @jsxImportSource @emotion/react */
import { CSSObject } from '@emotion/react';
import React from 'react';
import { SkeletonItemProps } from '../types';
import { BaseItemWrapper } from './styled';
import { itemSkeletonCSS } from './styles';

const SkeletonItem = ({
  hasAvatar,
  hasIcon,
  width,
  testId,
  isShimmering,
  cssFn = (currentStyles: CSSObject) => currentStyles,
}: SkeletonItemProps) => (
  <BaseItemWrapper
    css={cssFn(
      itemSkeletonCSS(hasAvatar, hasIcon, width, isShimmering),
      undefined,
    )}
    data-testid={testId}
  />
);

export default SkeletonItem;
