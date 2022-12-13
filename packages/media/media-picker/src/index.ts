import { MediaUploadOptions } from '@uidu/media-core';
import { UploadResult } from '@uppy/core';
import MediaPicker from './components/MediaPicker';

export * from './types';

export async function MediaPickerFactoryClass({
  uploadOptions,
  onComplete,
  ...rest
}: {
  uploadOptions: MediaUploadOptions;
  onComplete: (result: UploadResult) => void;
}): Promise<any> {
  const [{ PopupImpl }] = await Promise.all([
    import(
      /* webpackChunkName:"@uidu-internal_media-picker-popup" */ './components/popup'
    ),
  ]);

  return PopupImpl({ uploadOptions, onComplete, ...rest });
}

export default MediaPicker;
