import { FileIdentifier } from '@uidu/media-core';

export type MediaViewerProps = {
  files: Array<FileIdentifier>;
  currentIndex?: number | null;
  onClose?: () => void;
};

export type MediaViewerState = {
  currentView?: FileIdentifier;
};
