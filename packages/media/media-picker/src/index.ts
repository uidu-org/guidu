import { MediaUploadOptions } from '@uidu/media-core';
import { UploadResult } from '@uppy/core';

export { default } from './components/MediaPicker';
export * from './types';

export async function MediaPickerFactoryClass({
  uploadOptions,
  proxyReactContext,
  onComplete,
}: {
  uploadOptions: MediaUploadOptions;
  proxyReactContext: any;
  onComplete: (result: UploadResult) => void;
}): Promise<any> {
  const [{ PopupImpl }] = await Promise.all([
    import(
      /* webpackChunkName:"@uidu-internal_media-picker-popup" */ './components/popup'
    ),
  ]);

  //  const mediaClient = getMediaClient(mediaClientConfig);

  return PopupImpl({ uploadOptions, proxyReactContext, onComplete });
}
