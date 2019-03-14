import { Component, ReactNode } from 'react';

export type DropdownItemGroupProps = {
  /** DropdownItems to be rendered inside the group.*/
  children?: ReactNode;
  /** Optional heading text to be shown above the items. */
  title?: string;
  /** Content to be shown to the right of the title heading. Not shown if no title is set. */
  elemAfter?: ReactNode;
};

declare class DropdownItemGroup extends Component<DropdownItemGroupProps> {}

export default DropdownItemGroup;
