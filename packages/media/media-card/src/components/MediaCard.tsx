import { initializeFileTypeIcons } from '@uifabric/file-type-icons';
import React from 'react';
import { MediaCardProps } from '../types';
import File from './File';
import Image from './Image';
import MediaCardViewer from './MediaCardViewer';
import Video from './Video';

initializeFileTypeIcons();

export default function MediaCard({ file, ...rest }: MediaCardProps) {
  let content;

  if (!file) {
    content = 'File not found';
  } else {
    switch (file.kind) {
      case 'image':
        content = <Image {...file} />;
        break;
      case 'video':
        content = <Video {...file} />;
        break;
      default:
        content = <File {...file} />;
        break;
    }
  }

  return (
    <MediaCardViewer file={file} {...rest}>
      {content}
    </MediaCardViewer>
  );
}
