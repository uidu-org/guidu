/* tslint:disable:variable-name */
import * as React from 'react';
import ImageIcon from '@atlaskit/icon/glyph/image';
import AudioIcon from '@atlaskit/icon/glyph/audio';
import VideoIcon from '@atlaskit/icon/glyph/media-services/video';
import DocIcon from '@atlaskit/icon/glyph/document';
import UnknownIcon from '@atlaskit/icon/glyph/page';
import { IconWrapper } from './styled';

const icons: any = {
  image: ImageIcon,
  audio: AudioIcon,
  video: VideoIcon,
  doc: DocIcon,
  unknown: UnknownIcon,
};

export interface FileIconProps {
  type?: string;
  size?: string;
  className?: string;
}

export class MediaTypeIcon extends React.Component<FileIconProps, {}> {
  render() {
    const { type, size = 'small', className } = this.props;
    const Icon = (type && icons[type]) || icons.unknown;
    return (
      <IconWrapper type={type || 'unknown'}>
        <Icon label="media-type" size={size} className={className} />
      </IconWrapper>
    );
  }
}
