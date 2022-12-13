import MediaPicker from '@uidu/media-picker';
import * as React from 'react';
import { MediaPluginState } from '../pm-plugins/types';

type Props = {
  mediaState: MediaPluginState;
};

const noopNull = () => {};

export default function ClipboardMediaPickerWrapper({
  mediaState,
  mediaState: { mediaProvider, mediaOptions },
}: Props) {
  if (!mediaProvider) return null;

  const mediaPickerProps = mediaOptions.mediaPickerProps || noopNull;

  return (
    <MediaPicker
      uploadOptions={mediaState.mediaProvider.uploadOptions}
      onComplete={(result) => {
        mediaState.insertFiles(
          result.successful.map(mediaProvider.uploadOptions.responseHandler),
        );
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...mediaPickerProps(mediaState)}
    />
  );
}
