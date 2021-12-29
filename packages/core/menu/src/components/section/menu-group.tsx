import React from 'react';
import { MenuGroupProps } from '../types';
import { StyledMenuGroup } from './styled';

const MenuGroup = ({
  maxWidth,
  minWidth,
  minHeight,
  maxHeight,
  testId,
  ...rest
}: MenuGroupProps) => (
  <StyledMenuGroup
    maxWidth={maxWidth}
    minWidth={minWidth}
    minHeight={minHeight}
    maxHeight={maxHeight}
    data-testid={testId}
    {...rest}
  />
);

export default MenuGroup;
