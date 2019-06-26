import { initializeFileTypeIcons } from '@uifabric/file-type-icons';
import React, { PureComponent } from 'react';
import { MediaCardProps } from '../types';
import File from './File';
import Image from './Image';
import MediaCardViewer from './MediaCardViewer';
import Video from './Video';

initializeFileTypeIcons();

export default class MediaCard extends PureComponent<MediaCardProps> {
  render() {
    const { file } = this.props;

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

    return <MediaCardViewer {...this.props}>{content}</MediaCardViewer>;
  }
}
