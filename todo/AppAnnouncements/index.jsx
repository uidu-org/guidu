import Slider from '@uidu/slider';
import React from 'react';
import { Star } from 'react-feather';
import { hot } from 'react-hot-loader';

const AppAnnouncements = () => (
  <section className="container-fluid px-xl-4 mb-4">
    <Slider
      options={{
        slidesPerView: 2,
        // centeredSlides: false,
        // slideToClickedSlide: true,
        gutter: 32,
        // pagination: '.swiper-pagination',
        // paginationClickable: true,
        // grabCursor: true,
        breakpoints: {
          // when window width is <= 640px
          640: {
            // noSwiping: false,
            slidesPerView: 1,
          },
        },
      }}
      slideClassName="swiper-slide-visible"
    >
      <div className="card">
        <div className="card-body">
          <div className="media">
            <Star className="align-self-center mr-3" color="#fed156" />
            <div className="media-body">
              <p className="small mb-0">
                <strong>Tip:</strong>{' '}
                <span className="text-muted">
                  Far far away, behind the word mountains, far from the country
                  Vokalia, there live the blind texts
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <div className="media">
            <Star className="align-self-center mr-3" color="#fed156" />
            <div className="media-body">
              <div className="small mb-0">
                <strong>Tip:</strong>{' '}
                <span className="text-muted">
                  Far far away, behind the word mountains, far from the country
                  Vokalia, there live the blind texts
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <div className="media">
            <Star className="align-self-center mr-3" color="#fed156" />
            <div className="media-body">
              <div className="small mb-0">
                <strong>Tip:</strong>{' '}
                <span className="text-muted">
                  Far far away, behind the word mountains, far from the country
                  Vokalia, there live the blind texts
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Slider>
  </section>
);

export default hot(module)(AppAnnouncements);
