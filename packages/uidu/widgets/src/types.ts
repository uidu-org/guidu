import { SwiperOptions } from 'swiper';

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
  sliderOptions?: Partial<SwiperOptions>;
  scope: string;
  forwardedRef: React.RefObject<any>;
  embedded?: boolean;
};

export type ShellState = {
  activeSlide: number;
};
