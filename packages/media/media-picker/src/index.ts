import { MediaUploadOptions } from '@uidu/media-core';
import { UploadResult } from '@uppy/core';
import MediaPicker from './components/MediaPicker';
import PopupImpl from './components/popup';

export * from './types';

export function MediaPickerFactoryClass({
  uploadOptions,
  onComplete,
  ...rest
}: {
  uploadOptions: MediaUploadOptions;
  onComplete: (result: UploadResult) => void;
}) {
  return PopupImpl({ uploadOptions, onComplete, ...rest });
}

export default MediaPicker;
