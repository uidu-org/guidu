import AwsS3 from '@uppy/aws-s3';
import XHRUpload, { XHRUploadOptions } from '@uppy/xhr-upload';
import { FileType } from './types';
export * from './constants';
export * from './types';

export const getMediaClient = (media) => null;

const mediaBlobUrlIdentifier = 'media-blob-url';

export const isMediaBlobUrl = (url: string): boolean => {
  return url.indexOf(`${mediaBlobUrlIdentifier}=true`) > -1;
};

export const localUploadOptions = (options: XHRUploadOptions) => ({
  module: XHRUpload,
  options,
  responseHandler: ({ response: { body } }) => body,
});

export const s3UploadOptions = ({
  url: companionUrl,
  type = 'file',
}: {
  url: string;
  type: FileType;
}) => ({
  module: AwsS3,
  options: {
    companionUrl,
  },
  responseHandler: (file) => ({
    id: file.meta['key'].match(/^cache\/(.+)/)[1], // object key without prefix
    storage: 'cache',
    type,
    metadata: {
      size: file.size,
      filename: file.name,
      mime_type: file.type,
    },
  }),
});
