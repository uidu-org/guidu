import { Component, ReactNode } from 'react';
import textContent from 'react-addons-text-content';

export type ItemGroupProps = {
  /** Items to be shown inside the item group. */
  children?: ReactNode;
  /** Causes the group title to be rendered with reduced spacing. */
  isCompact?: boolean;
  /** Optional heading text to be shown above the items. */
  title?: ReactNode;
  /** Content to be shown to the right of the heading */
  elemAfter?: ReactNode | string;
  /** A function that returns the DOM ref created by the group */
  innerRef?: Function;
  /** Accessibility role to be applied to the root component */
  role: string;
  /** Accessibility label - if not provided the title will be used if available */
  label?: ReactNode;
};

export default class ItemGroup extends Component<ItemGroupProps, {}> {}
