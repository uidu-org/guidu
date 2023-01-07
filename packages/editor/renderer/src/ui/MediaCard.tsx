import { withImageLoader } from '@uidu/editor-common';
import UiduMediaCard, { MediaCardProps } from '@uidu/media-card';
import React, { useEffect, useState } from 'react';

function MediaCardInternal({ mediaProvider, ...props }: MediaCardProps) {
  const [file, setFile] = useState(mediaProvider ? null : props.file);

  useEffect(() => {
    async function onMount() {
      if (mediaProvider) {
        const mediaProviderObject = await mediaProvider;
        const mediaClientConfig = mediaProviderObject.viewMediaClientConfig;

        mediaClientConfig(props.file).then(setFile).catch(console.error);
      }
    }
    onMount();
  }, [mediaProvider, props.file]);

  if (!file) {
    return (
      <div tw="h-full w-full bg-gray-100 dark:bg-gray-900 rounded blur-sm" />
    );
  }

  return <UiduMediaCard {...props} file={file} />;
}

export const MediaCard = withImageLoader<MediaCardProps>(MediaCardInternal);
