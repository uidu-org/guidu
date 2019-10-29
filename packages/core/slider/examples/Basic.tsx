import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Slider from '..';

const Slide = styled.div`
  text-align: center;
  font-size: 18px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default class Basic extends PureComponent {
  render() {
    return (
      <div style={{ height: 400 }}>
        <Slider
          className="h-100"
          // ref={c => {
          //   this.slider = c;
          // }}
          // options={{
          //   allowTouchMove: false,
          //   spaceBetween: 0,
          //   on: {
          //     slideChangeTransitionEnd: this.slideCallback,
          //   },
          //   loop: false,
          //   initialSlide: 0,
          //   slidesPerView: 1,
          //   autoHeight: true,
          //   watchSlidesVisibility: true,
          //   centeredSlides: true,
          //   paginationClickable: true,
          //   grabCursor: true,
          // }}
          // slideClassName="swiper-slide-full-width swiper-slide-visible"
        >
          <Slide>Slide1</Slide>
          <Slide>Slide2</Slide>
        </Slider>
      </div>
    );
  }
}
