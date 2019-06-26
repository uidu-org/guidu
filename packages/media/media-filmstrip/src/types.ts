import { FileIdentifier } from '@uidu/media-core';

export type MediaFilmStripProps = {
  files: Array<FileIdentifier>;
  onRemove?: () => void;
};

export type MediaFilmStripState = {
  currentModal: number | undefined;
};
