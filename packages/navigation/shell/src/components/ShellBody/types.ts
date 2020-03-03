export type ShellBodyProps = {
  className?: string;
  scrollable?: boolean | 'mobileOnly';
  shadowOnScroll?: boolean;
  forwardedRef?: React.RefObject<HTMLDivElement>;
  children?: any;
};

export type ShellBodyState = {
  shadowedHeader: boolean;
};
