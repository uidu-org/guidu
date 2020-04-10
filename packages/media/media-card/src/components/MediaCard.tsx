import { initializeFileTypeIcons } from '@uifabric/file-type-icons';
import React from 'react';
import { MediaCardProps } from '../types';
import File from './File';
import Image from './Image';
import MediaCardViewer from './MediaCardViewer';
import Video from './Video';

initializeFileTypeIcons();

export default function MediaCard(props: MediaCardProps) {
  let content;
  const {
    file,
    file: { type, id },
  } = props;

  if (!id) {
    content = 'File not found';
  } else {
    switch (type) {
      case 'image':
        content = <Image {...props} {...file} />;
        break;
      case 'video':
        content = <Video {...props} {...file} />;
        break;
      default:
        content = <File {...props} {...file} />;
        break;
    }
  }

  return (
    <MediaCardViewer {...props} file={file}>
      {content}
    </MediaCardViewer>
  );
}
