import classNames from 'classnames';
import React, {
  Children,
  cloneElement,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import Swiper, { SwiperOptions } from 'swiper';
import 'swiper/css/swiper.min.css';
import { SliderProps } from '../types';

const defaultSwiperOptions: Partial<SwiperOptions> = {
  direction: 'horizontal',
  initialSlide: 0,
  slidesPerView: 1,
  keyboard: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    dynamicBullets: true,
    clickable: true,
  },
  spaceBetween: 16,
  watchSlidesProgress: true,
  watchSlidesVisibility: true,
  centeredSlides: false,
};

function Slider({
  options,
  className = '',
  pagination = false,
  navigation = false,
  scrollbar = false,
  children,
  forwardedRef,
}: SliderProps) {
  const defaultOptions = {
    ...defaultSwiperOptions,
    ...options,
  };
  const slider = useRef(null);

  const setSlider = useCallback(node => {
    console.log('created new slider');
    slider.current = new Swiper(node, defaultOptions);
  }, []);

  useEffect(() => {
    console.log('updates slider');
    slider.current?.update();
    return () => null;
  }, [children]);

  useImperativeHandle(forwardedRef, () => slider.current);

  const renderChildren = useCallback(() => {
    return Children.map(children, (child: any, index) => {
      if (child) {
        return cloneElement(child, {
          key: index,
          className: classNames('swiper-slide', child.props.className),
        });
      }
      return null;
    });
  }, [children]);

  return (
    <div className={classNames('swiper-container', className)} ref={setSlider}>
      <div className="swiper-wrapper">{renderChildren()}</div>
      {pagination && <div className="swiper-pagination" />}
      {navigation && <div className="swiper-button-prev" />}
      {navigation && <div className="swiper-button-next" />}
      {scrollbar && <div className="swiper-scrollbar" />}
    </div>
  );
}

export default forwardRef((props: SliderProps, ref) => (
  <Slider {...props} forwardedRef={ref} />
));
