import { OverlayScrollbarsComponentProps } from 'overlayscrollbars-react';
import { FC, ReactNode, RefObject } from 'react';

export type ShellBodyProps = {
  /** required for managing shellbody on desktop and mobile environment */
  id?: string;
  className?: string;
  innerClassName?: string;
  shadowOnScroll?: boolean;
  forwardedRef?: RefObject<HTMLDivElement>;
  children?: ReactNode;
  enableCustomScrollbars?: boolean;
  customScrollbarProps?: Partial<OverlayScrollbarsComponentProps>;

  /** Inner component to be used for rendering the children */
  innerComponent?: FC<{ children: ReactNode; className: string }>;
};

export type ShellBodyState = {
  shadowedHeader: boolean;
};
