import { FileIdentifier } from '@uidu/media-core';

export type MediaFilmstripProps = {
  files: Array<FileIdentifier>;
  onRemove?: () => void;
};

export type MediaFilmstripState = {
  currentModal: number | undefined;
};
