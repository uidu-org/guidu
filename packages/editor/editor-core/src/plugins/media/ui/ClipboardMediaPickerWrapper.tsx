import MediaPicker from '@uidu/media-picker';
import * as React from 'react';
import { MediaPluginState } from '../pm-plugins/types';

type Props = {
  mediaState: MediaPluginState;
};

export default class ClipboardMediaPickerWrapper extends React.Component<Props> {
  show = () => {};

  setUploadOptions = async () => {
    const {
      mediaState: { mediaProvider },
    } = this.props;
    return await mediaProvider?.uploadOptions;
  };

  render() {
    const { mediaState } = this.props;
    if (!mediaState.mediaProvider) return null;

    return (
      <MediaPicker
        uploadOptions={mediaState.mediaProvider.uploadOptions}
        onComplete={(result) => {
          mediaState.insertFile(result);
        }}
      />
    );
  }
}
