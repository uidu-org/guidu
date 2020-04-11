// export * from './item';

// export { FileFetcher } from './file';
// export * from './context/context';
// export * from './utils';
// export * from './fileState';
// export * from './utils/getMediaTypeFromMimeType';
// export * from './context/fileStreamCache';
// export type ImageResizeMode = 'crop' | 'fit' | 'full-fit' | 'stretchy-fit';
export * from './constants';
export * from './types';

export const getMediaClient = (media) => null;

const mediaBlobUrlIdentifier = 'media-blob-url';

export const isMediaBlobUrl = (url: string): boolean => {
  return url.indexOf(`${mediaBlobUrlIdentifier}=true`) > -1;
};
