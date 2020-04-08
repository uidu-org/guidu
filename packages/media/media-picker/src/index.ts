export { default } from './components/MediaPicker';

export async function MediaPickerFactoryClass({
  uploadParams,
  proxyReactContext,
}): Promise<any> {
  const [{ PopupImpl }] = await Promise.all([
    import(
      /* webpackChunkName:"@uidu-internal_media-picker-popup" */ './components/popup'
    ),
  ]);

  //  const mediaClient = getMediaClient(mediaClientConfig);

  return PopupImpl({ uploadParams, proxyReactContext });
}
