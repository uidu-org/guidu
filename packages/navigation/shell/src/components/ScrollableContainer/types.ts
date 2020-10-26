import { OverlayScrollbarsComponentProps } from 'overlayscrollbars-react';
import { RefObject } from 'react';

export type ShellBodyProps = {
  /** required for managing shellbody on desktop and mobile environment */
  id?: string;
  className?: string;
  shadowOnScroll?: boolean;
  forwardedRef?: RefObject<HTMLDivElement>;
  children?: any;
  enableCustomScrollbars?: boolean;
  customScrollbarProps?: Partial<OverlayScrollbarsComponentProps>;
};

export type ShellBodyState = {
  shadowedHeader: boolean;
};
