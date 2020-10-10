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
import Swiper, {
  A11y,
  Autoplay,
  History,
  Keyboard,
  Navigation,
  Pagination,
  Scrollbar,
  SwiperOptions,
} from 'swiper';
// https://github.com/nolimits4web/swiper/issues/3708
// require('swiper/swiper-bundle.css');
// https://github.com/nolimits4web/swiper/issues/3777
// import 'swiper/swiper.scss';
import { v1 as uuid } from 'uuid';
import { SliderProps } from '../types';

Swiper.use([
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  History,
  Keyboard,
  Autoplay,
]);

const defaultSwiperOptions = (id: string): Partial<SwiperOptions> => ({
  direction: 'horizontal',
  initialSlide: 0,
  slidesPerView: 1,
  keyboard: true,
  simulateTouch: false,
  navigation: {
    nextEl: `#${id}-button-next`,
    prevEl: `#${id}-button-prev`,
  },
  pagination: {
    el: `#${id}-pagination`,
    type: 'bullets',
    dynamicBullets: true,
    clickable: true,
  },
  spaceBetween: 16,
  watchSlidesProgress: true,
  watchSlidesVisibility: true,
  centeredSlides: false,
});

function Slider({
  options,
  className = '',
  pagination = false,
  navigation = false,
  scrollbar = false,
  children,
  forwardedRef,
}: SliderProps) {
  const slider = useRef(null);
  const id = useRef(`slider-${uuid()}`);

  const defaultOptions = {
    ...defaultSwiperOptions(id.current),
    ...options,
  };

  const setSlider = useCallback((node) => {
    slider.current = new Swiper(node, defaultOptions);
  }, []);

  useEffect(() => {
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
    <div
      className={classNames('swiper-container', className)}
      ref={setSlider}
      id={id.current}
    >
      <div className="swiper-wrapper">{renderChildren()}</div>
      {pagination && (
        <div id={`${id.current}-pagination`} className="swiper-pagination" />
      )}
      {navigation && (
        <div id={`${id.current}-button-prev`} className="swiper-button-prev" />
      )}
      {navigation && (
        <div id={`${id.current}-button-next`} className="swiper-button-next" />
      )}
      {scrollbar && (
        <div id={`${id.current}-scrollbar`} className="swiper-scrollbar" />
      )}
    </div>
  );
}

export default forwardRef((props: SliderProps, ref) => (
  <Slider {...props} forwardedRef={ref} />
));
