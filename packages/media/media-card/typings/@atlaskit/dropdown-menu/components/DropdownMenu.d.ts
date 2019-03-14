import { Component } from 'react';
import { DropdownMenuStatefulProps, DeprecatedItemGroup } from '../types';

export type DropdownMenuState = {
  isOpen: boolean;
  items: Array<DeprecatedItemGroup>;
};

declare class DropdownMenu extends Component<
  DropdownMenuStatefulProps,
  DropdownMenuState
> {}

export default DropdownMenu;
