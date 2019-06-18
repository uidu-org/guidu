export type ShellProps = {
  slides: Array<any>;
  scope: string;
  currentMember?: any;
  forwardedRef: React.RefObject<any>;
};

export type ShellState = {
  activeSlide: number;
};
