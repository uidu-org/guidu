import { FileIdentifier } from '@uidu/media-core';

export type MediaCardProps = {
  file: FileIdentifier;
  cardDimensions?: any;
  onClick?: () => void;
  onOpen?: () => void;
  onRemove?: () => void;
  style?: any;
};

export type GridOptions = {};

export type MediaCardGroupProps = {
  files: FileIdentifier[];
  layout: 'slider' | 'grid';
  gridOptions?: GridOptions;
  // sliderProps?: SliderOptions;
};
