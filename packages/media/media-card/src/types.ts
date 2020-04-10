import { FileIdentifier } from '@uidu/media-core';

export type MediaCardProps = {
  file: FileIdentifier;
  cardDimensions?: any;
  onClick?: () => void;
  onOpen?: () => void;
  onRemove?: () => void;
  style?: any;
};
