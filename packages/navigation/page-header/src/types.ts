import { ReactElement, ReactNode } from 'react';

export type PageHeaderProps = {
  /** Returns the inner ref of the component. This is exposed so the focus can be set. */
  innerRef?: (element: HTMLElement) => void;
  /** Page breadcrumbs to be rendered above the title. */
  breadcrumbs?: ReactElement;
  /** Contents of the action bar to be rendered next to the page title. */
  actions?: ReactElement;
  /** Classnames applied to PageHeader wrapper */
  className?: string;
  /** Content of the page title. The text would be trimmed if it doesn't fit the
   header width and end with an ellipsis */
  children?: ReactNode;
  /** Disable default styles for page title */
  disableTitleStyles?: boolean;
  /** Prevent the title from wrapping across lines */
  truncateTitle?: boolean;
};
