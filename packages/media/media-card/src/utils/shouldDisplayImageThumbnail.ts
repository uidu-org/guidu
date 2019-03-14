import { MediaType } from '@uidu/media-core';

export const shouldDisplayImageThumbnail = (
  dataURI?: string,
  mediaType?: MediaType,
): dataURI is string => {
  return !!(mediaType !== 'doc' && dataURI);
};
