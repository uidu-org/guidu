import { withImageLoader } from '@uidu/editor-common';
import UiduMediaCard, { MediaCardProps } from '@uidu/media-card';
import * as React from 'react';
import { Component } from 'react';

export class MediaCardInternal extends Component<MediaCardProps> {
  render() {
    const { file } = this.props;

    return <UiduMediaCard file={file} />;
  }
}

export const MediaCard = withImageLoader<MediaCardProps>(MediaCardInternal);
