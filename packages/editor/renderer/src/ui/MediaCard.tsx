import { withImageLoader } from '@uidu/editor-common';
import UiduMediaCard, { MediaCardProps } from '@uidu/media-card';
import * as React from 'react';

function MediaCardInternal(props: MediaCardProps) {
  return <UiduMediaCard {...props} />;
}

export const MediaCard = withImageLoader<MediaCardProps>(MediaCardInternal);
