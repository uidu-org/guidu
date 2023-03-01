import React from 'react';
import styled from 'styled-components';
import { Keyboard, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import tw from 'twin.macro';
import { MediaViewerProps } from '../types';
import View from './View';

// https://github.com/nolimits4web/swiper/issues/3599
const SwiperWrapper = styled.div`
  --swiper-navigation-size: 2rem;
  --swiper-theme-color: rgba(var(--body-primary), 1);

  .swiper {
    ${tw`w-full h-full [overflow:hidden]`}
  }

  .swiper-wrapper {
  }

  .swiper-slide {
    opacity: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: auto;
    flex-shrink: 0;
    height: 100%;
    max-height: 100%;
  }
`;

export default function MediaViewer({
  files,
  onSwiper,
  onSlideChange,
  config,
  ...rest
}: MediaViewerProps) {
  return (
    <SwiperWrapper tw="h-full w-full overflow-hidden">
      <Swiper
        onSlideChange={onSlideChange}
        modules={[Keyboard, Navigation]}
        keyboard
        navigation
        spaceBetween={0}
        slidesPerView={1}
        loop
        onSwiper={(swiper) => {
          if (onSwiper) onSwiper(swiper);
        }}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      >
        {files.map((file) => (
          <SwiperSlide key={file.id}>
            <View file={file} config={config} />
          </SwiperSlide>
        ))}
      </Swiper>
    </SwiperWrapper>
  );
}
