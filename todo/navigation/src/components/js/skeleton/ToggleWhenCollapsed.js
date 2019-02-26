// @flow
import { type Node } from 'react';

export type Props = {
  isCollapsed?: boolean,
  children?: Node,
};

export const ShownWhenCollapsed = ({
  isCollapsed = false,
  children,
}: Props) => {
  return isCollapsed ? children : null;
};

export const HiddenWhenCollapsed = ({
  isCollapsed = false,
  children,
}: Props) => {
  return isCollapsed ? null : children;
};
