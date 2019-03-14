// We currently need to keep the dropdown open if an item with `href` is clicked, to avoid the
// analytics package to track the href value without the event target disappearing. Without this
// requirement, we could just use a native click event all the way up to DropdownMenuStateless,
// and could get rid of this HOC and DropdownItemClickManager.

import { Component, ReactNode, ComponentType } from 'react';

export type WithItemClickProps = {
  /** Content to be displayed inside the item. Same as @uidu/item `children` prop. */
  children?: ReactNode;
  /** If true, the item appears greyed out and does not fire click events. */
  isDisabled?: boolean;
  /** If true, the item appears greyed out and does not fire click events. */
  href?: string;
  /** Standard onClick handler */
  onClick?: Function;
};

// HOC that typically wraps @uidu/item
declare const withItemClick: (
  WrappedItem: ComponentType<any>,
) => ComponentType<WithItemClickProps>;

export default withItemClick;
