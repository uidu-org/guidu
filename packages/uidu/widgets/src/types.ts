export type ShellSlide = {
  header: {
    to: 'back' | string;
    name: React.ReactNode;
  };
  component: any;
  key: any;
  'data-history': any;
  unwrapped?: boolean;
};

export type ShellProps = {
  baseUrl: string;
  slides: Array<ShellSlide>;
  scope: string;
  forwardedRef: React.RefObject<any>;
  embedded?: boolean;
};

export type ShellState = {
  activeSlide: number;
};
