import React from 'react';
import { MediaCardProps } from '../types';
import File from './File';
import Image from './Image';
import MediaCardViewer from './MediaCardViewer';
import Video from './Video';

const NotFound = () => <p>File not found</p>;

export default function MediaCard(props: MediaCardProps) {
  let content;
  const {
    file,
    file: { type, id },
  } = props;

  console.log('file', file);

  if (!id) {
    content = NotFound;
  } else {
    switch (type) {
      case 'image':
        content = Image;
        break;
      case 'video':
        content = Video;
        break;
      default:
        content = File;
        break;
    }
  }

  return <MediaCardViewer {...props} file={file} component={content} />;
}
