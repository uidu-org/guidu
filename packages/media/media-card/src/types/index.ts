import { FileIdentifier } from '@uidu/media-core';

export type MediaCardProps = {
  file: FileIdentifier;
  onClick?: () => void;
  onOpen?: () => void;
  onRemove?: () => void;
  style?: any;
};
