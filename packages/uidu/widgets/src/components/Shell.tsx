import { ShellBody, ShellHeader, ShellMain, ScrollableContainer } from '@uidu/shell';
import Slider, { Slide } from '@uidu/slider';
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Circle } from 'react-feather';
import Swiper from 'swiper';
import { ShellProps } from '../types';
import ShellHeaderCloseAndNavigate from './ShellHeaderCloseAndNavigate';
import ShellHeaderSlideBack from './ShellHeaderSlideBack';
import ShellSlideWrapper from './ShellSlideWrapper';

function Shell({
  forwardedRef,
  baseUrl,
  slides,
  scope,
  embedded,
  sliderOptions = {},
}: ShellProps) {
  const container: React.RefObject<HTMLDivElement> = useRef(null);
  const slider: React.RefObject<Swiper> = useRef(null);
  const [activeSlide, setActiveSlide] = useState(
    sliderOptions?.initialSlide || 0,
  );

  useImperativeHandle(forwardedRef, () => slider.current);

  const onSlideBack = (e) => {
    e.preventDefault();
    slider.current.slidePrev();
  };

  const renderSlideHeader = ({ header: { to, name } }) => {
    return (
      <>
        {to === 'back' ? (
          <ShellHeaderSlideBack onSlideBack={onSlideBack} />
        ) : (
          <ShellHeaderCloseAndNavigate to={baseUrl} />
        )}
        <div className="navbar-title">
          <span className="navbar-brand m-0">{name}</span>
        </div>
      </>
    );
  };

  return (
    <>
      <ShellHeader className="border-bottom px-3 px-xl-4 justify-content-between">
        {renderSlideHeader(slides[activeSlide])}
        <div className="navbar-actions" id="navbar-actions">
          <ul className="list-inline d-flex align-items-center justify-content-end mb-0 flex-nowrap">
            {slides.map((slide, index) => (
              <li className="nav-item" key={slide.key}>
                <a
                  className={`nav-link px-1 ${
                    index === activeSlide ? `text-${scope}` : 'text-muted'
                  }`}
                >
                  {index === activeSlide ? (
                    <Circle
                      size={10}
                      fill="currentColor"
                      stroke="currentColor"
                    />
                  ) : (
                    <Circle size={10} fill="#f1f3f5" stroke="#f1f3f5" />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </ShellHeader>
      <ShellBody>
        <ShellMain>
          <ScrollableContainer ref={container}>

        <Slider
          options={{
            slidesPerView: 1,
            allowTouchMove: false,
            simulateTouch: false,
            autoHeight: true,

            history: {
              key: baseUrl,
            },
            on: {
              slideChange: () => {
                if (slider.current) {
                  setActiveSlide(slider.current.activeIndex);
                  container.current.scrollTop = 0;
                }
              },
            },
            ...sliderOptions,
          }}
          ref={slider}
        >
          {slides.map((slide) => (
            <Slide key={slide.key} data-history={slide['data-history']}>
              {slide.unwrapped ? (
                slide.component
                ) : (
                  <ShellSlideWrapper embedded={embedded}>
                  {slide.component}
                </ShellSlideWrapper>
              )}
            </Slide>
          ))}
        </Slider>
          </ScrollableContainer>
        </ShellMain>
      </ShellBody>
    </>
  );
}

export default forwardRef((props: any, ref: React.Ref<Swiper>) => (
  <Shell {...props} forwardedRef={ref} />
));
