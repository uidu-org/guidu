import Contact from '@uidu/contact';
import { ShellBody, ShellHeader } from '@uidu/shell';
import Slider, { Slide } from '@uidu/slider';
import React, { Component, forwardRef } from 'react';
import { ArrowLeft, Circle } from 'react-feather';
import { ShellProps, ShellState } from '../types';

class Shell extends Component<ShellProps, ShellState> {
  container: React.RefObject<HTMLDivElement> = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0,
    };
  }

  renderSlideHeader = ({ header }) => {
    return (
      <>
        {header.itemBefore}
        <div className="navbar-title">
          <span className="navbar-brand m-0">{header.name}</span>
        </div>
      </>
    );
  };

  render() {
    const { slides, scope, currentMember, forwardedRef } = this.props;
    const { activeSlide } = this.state;

    if (!currentMember && slides.map(s => s.key).indexOf('contact') < 0) {
      slides.splice(1, 0, {
        key: 'contact',
        header: {
          itemBefore: (
            <div className="navbar-header" key="contact-header">
              <a
                href="#"
                className="navbar-brand d-flex align-items-center"
                onClick={e => {
                  e.preventDefault();
                  (forwardedRef.current as any).prev();
                }}
              >
                <ArrowLeft />
              </a>
            </div>
          ),
          name: 'Contatto',
        },
        component: (
          <div className="container px-0">
            <Contact
              {...this.props}
              submitted
              scope={scope}
              contact={currentMember}
              onSave={() =>
                setTimeout(() => (forwardedRef.current as any).next(), 500)
              }
            />
          </div>
        ),
      });
    }

    return (
      <>
        <ShellHeader className="border-bottom px-3 px-xl-4 justify-content-between">
          {this.renderSlideHeader(slides[activeSlide])}
          <div className="navbar-actions" id="navbar-actions">
            <ul className="list-inline d-flex align-items-center justify-content-end mb-0 flex-nowrap">
              {slides.map((slide, index) => (
                <li className="nav-item" key={slide.key}>
                  <a className="nav-link px-1">
                    {index === activeSlide ? (
                      <Circle size={10} fill="#26a69a" stroke="#26a69a" />
                    ) : (
                      <Circle size={10} fill="#f1f3f5" stroke="#f1f3f5" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </ShellHeader>
        <ShellBody scrollable ref={this.container}>
          <Slider
            options={{
              slidesPerView: 1,
              allowTouchMove: true,
              autoHeight: true,
              // simulateTouch: false,
              on: {
                slideChange: () => {
                  this.setState(
                    {
                      activeSlide: (forwardedRef.current as any).mySlider
                        .activeIndex,
                    },
                    () => {
                      console.log(this.container);
                      this.container.current.scrollTop = 0;
                    },
                  );
                },
              },
            }}
            ref={forwardedRef}
          >
            {slides.map(slide => (
              <Slide>{slide.component}</Slide>
            ))}
          </Slider>
        </ShellBody>
      </>
    );
  }
}

export default forwardRef((props: any, ref) => (
  <Shell {...props} forwardedRef={ref} />
));
