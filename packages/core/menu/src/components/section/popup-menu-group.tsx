import React from 'react';
import { MenuGroupProps } from '../types';
import MenuGroup from './menu-group';

const PopupMenuGroup = ({
  maxWidth = 800,
  minWidth = 320,
  ...rest
}: MenuGroupProps) => (
  <MenuGroup maxWidth={maxWidth} minWidth={minWidth} {...rest} />
);

export default PopupMenuGroup;
