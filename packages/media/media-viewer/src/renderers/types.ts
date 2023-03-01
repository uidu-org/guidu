import { FileIdentifier } from '@uidu/media-core';
import { FC } from 'react';

export interface DocRendererProps {
  file: FileIdentifier;
}

export interface DocRenderer extends FC<DocRendererProps> {
  fileTypes: string[];
  weight: number;
  // fileLoader?: FileLoaderFunction | null | undefined;
}
