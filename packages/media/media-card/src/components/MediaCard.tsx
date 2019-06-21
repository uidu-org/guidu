import React, { PureComponent } from 'react';
import { MediaCardProps } from '../types';
import Image from './Image';
import MediaCardViewer from './MediaCardViewer';

export default class MediaCard extends PureComponent<MediaCardProps> {
  render() {
    const { file, ...otherProps } = this.props;

    console.log(file);

    let content;

    if (!file) {
      content = 'File not found';
    } else {
      switch (file.type) {
        case 'image':
          content = <Image {...file} />;
          break;
        default:
          content = (
            <p>
              Unupported file type <code>{file.type}</code>
            </p>
          );
      }
    }

    return <MediaCardViewer {...otherProps}>{content}</MediaCardViewer>;
  }
}
