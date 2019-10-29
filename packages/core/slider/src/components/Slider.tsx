import classNames from 'classnames';
import React, { Children, cloneElement, Component } from 'react';
import Swiper from 'swiper';
import 'swiper/css/swiper.min.css';

export default class Slider extends Component<any> {
  private slider: React.RefObject<HTMLDivElement> = React.createRef();
  private mySlider: Swiper = undefined;

  static defaultProps = {
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

  componentDidMount() {
    const { options } = this.props;
    const defaultOptions = {
      ...Slider.defaultProps.options,
      ...options,
    };
    this.mySlider = new Swiper(this.slider.current, defaultOptions);
  }

  prev = () => this.mySlider.slidePrev();

  next = () => this.mySlider.slideNext();

  to = index => this.mySlider.slideTo(index);

  update = () => this.mySlider.update();

  renderChildren() {
    const { children } = this.props;

    return Children.map(children, (child: any, index) => {
      if (child) {
        console.log(child);
        return cloneElement(child, {
          key: index,
          className: classNames('swiper-slide', child.props.className),
        });
      }
      return null;
    });
  }

  render() {
    const { className, pagination, navigation, scrollbar } = this.props;

    return (
      <div
        className={classNames('swiper-container', className)}
        ref={this.slider}
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
