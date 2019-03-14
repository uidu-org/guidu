import { Component, ReactNode, ComponentType } from 'react';

// HOC that typically wraps @uidu/item

export type WithItemFocusProps = {
  /** Content to be displayed inside the item. Same as @uidu/item `children` prop. */
  children?: ReactNode;
  /** If true, the item appears greyed out and does not fire click events. */
  isDisabled?: boolean;
  /** If true, the item is mounted but not rendered. */
  isHidden?: boolean;
};

declare const withItemFocus: (
  WrappedComponent: any,
) => ComponentType<WithItemFocusProps>;

export default withItemFocus;
