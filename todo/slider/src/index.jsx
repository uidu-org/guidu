import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Swiper from 'swiper/dist/js/swiper.js';

export default class Slider extends Component {
  componentDidMount() {
    const { options } = this.props;
    const defaultOptions = {
      ...Slider.defaultProps.options,
      ...options,
    };
    this.mySlider = new Swiper(this.slider, defaultOptions);
  }

  prev = () => this.mySlider.slidePrev();

  next = () => this.mySlider.slideNext();

  to = index => this.mySlider.slideTo(index);

  update = () => this.mySlider.update(true);

  renderChildren() {
    const { children, slideClassName } = this.props;

    return Children.map(children, (child, index) => {
      if (child) {
        return (
          <div
            key={index}
            className={classNames('swiper-slide', slideClassName)}
          >
            {cloneElement(child, {})}
          </div>
        );
      }
      return null;
    });
  }

  render() {
    const { className, pagination, navigation, scrollbar } = this.props;

    return (
      <div
        className={classNames('swiper-container', className)}
        ref={c => {
          this.slider = c;
        }}
      >
        <div className="swiper-wrapper">{this.renderChildren()}</div>
        {pagination && <div className="swiper-pagination" />}
        {navigation && <div className="swiper-button-prev" />}
        {navigation && <div className="swiper-button-next" />}
        {scrollbar && <div className="swiper-scrollbar" />}
      </div>
    );
  }
}

Slider.defaultProps = {
  className: '',
  slideClassName: '',
  pagination: false,
  navigation: false,
  scrollbar: false,
  options: {
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
    onSlideChangeEnd: () => {},
    // breakpoints: {
    //   // when window width is <= 480px
    //   480: {
    //     noSwiping: false,
    //     slidesPerView: 1.2,
    //   },
    // },
  },
};

Slider.propTypes = {
  className: PropTypes.string,
  slideClassName: PropTypes.string,
  children: PropTypes.node.isRequired,
  options: PropTypes.shape(PropTypes.obj),
  pagination: PropTypes.bool,
  navigation: PropTypes.bool,
  scrollbar: PropTypes.bool,
};
