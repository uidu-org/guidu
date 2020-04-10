import MediaPicker from '@uidu/media-picker';
import * as React from 'react';
import { MediaPluginState } from '../pm-plugins/types';

type Props = {
  mediaState: MediaPluginState;
};

export default class ClipboardMediaPickerWrapper extends React.Component<
  Props
> {
  show = () => {};

  render() {
    const { mediaState } = this.props;
    return (
      <MediaPicker
        onComplete={(result) => {
          mediaState.insertFile(result);
        }}
      />
    );
  }
}
