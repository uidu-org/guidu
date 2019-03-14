import * as React from 'react';
import ImageLoader from 'react-render-image';
import { Image } from './styled';

export interface ImageIconProps {
  alt?: string;
  size?: number;
  src?: string;
  title?: string;
  default?: React.ReactNode;
}

export class ImageIcon extends React.Component<ImageIconProps> {
  render() {
    const { alt = '', src, size = 16, title } = this.props;
    if (!src) {
      return this.props.default || null;
    }
    return (
      <ImageLoader
        src={src}
        loading={this.props.default}
        loaded={<Image src={src} alt={alt} size={size} title={title} />}
        errored={this.props.default}
      />
    );
  }
}
