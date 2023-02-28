import { FileIdentifier } from '@uidu/media-core';
import { SwiperProps } from 'swiper/react';

export type MediaViewerProps = SwiperProps & {
  files: Array<FileIdentifier>;
  currentIndex?: number | null;
  onClose?: () => void;
  onSwiper: SwiperProps['onSwiper'];
  onSlideChange: SwiperProps['onSlideChange'];
};

export type MediaViewerState = {
  currentView?: FileIdentifier;
};

export type ModalMediaViewerProps = {} & MediaViewerProps;
