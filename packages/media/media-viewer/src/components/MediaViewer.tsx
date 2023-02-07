import React, { useState } from 'react';
import { Keyboard } from 'swiper';

import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { MediaViewerProps } from '../types';

export default function MediaViewer({
  currentIndex = 0,
  files,
  onClose,
}: MediaViewerProps) {
  const [currentView, setCurrentView] = useState(files[currentIndex]);
  const onViewChange = (index: number) => setCurrentView(files[index]);

  {
    /* <Header currentView={currentView} onClose={onClose} /> */
  }
  return (
    <Swiper
      onSlideChange={onViewChange}
      initialSlide={currentIndex}
      modules={[Keyboard]}
      keyboard
    >
      {files.map(({ url }) => (
        <SwiperSlide>
          <img src={url} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
