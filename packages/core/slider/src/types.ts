import { ClassValue } from 'classnames/types';
import { SwiperOptions } from 'swiper';

export type SliderProps = {
  options?: SwiperOptions;
  className?: ClassValue;
  pagination?: boolean;
  navigation?: boolean;
  scrollbar?: boolean;
  children: any;
  forwardedRef?: any;
};
