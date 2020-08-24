import React from 'react';
import { NavItem, NavLine } from '../styled';
import { TabItemComponentProvided } from '../types';

const noop = () => {};

export default function TabItem({
  data = {},
  elementProps = {},
  innerRef = noop,
  isSelected = false,
}: TabItemComponentProvided) {
  return (
    <NavItem
      {...elementProps}
      ref={innerRef}
      status={isSelected ? 'selected' : 'normal'}
    >
      {data.label}
      {isSelected && <NavLine status="selected" />}
    </NavItem>
  );
}
