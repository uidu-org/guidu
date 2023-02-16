import AwsS3, { AwsS3Options } from '@uppy/aws-s3';
import { Restrictions, UploadedUppyFile } from '@uppy/core';
import XHRUpload, { XHRUploadOptions } from '@uppy/xhr-upload';
import { DropzoneProps } from 'react-dropzone';
import { FileIdentifier, FileType } from './types';

export * from './constants';
export * from './types';

export function getMediaClient() {
  return null;
}

const mediaBlobUrlIdentifier = 'media-blob-url';

export function isMediaBlobUrl(url: string): boolean {
  return url.indexOf(`${mediaBlobUrlIdentifier}=true`) > -1;
}

export function localUploadOptions(options: XHRUploadOptions): {
  module: typeof XHRUpload;
  options: XHRUploadOptions;
  responseHandler: ({ response }: { response: Response }) => void;
} {
  return {
    module: XHRUpload,
    options,
    responseHandler: ({ response: { body } }) => body,
  };
}

export function s3UploadOptions({
  url: companionUrl,
  type = 'file',
  ...rest
}: {
  url: string;
  type: FileType;
} & AwsS3Options): {
  module: typeof AwsS3;
  options: AwsS3Options;
  responseHandler: (response: UploadedUppyFile<any, any>) => FileIdentifier;
} {
  return {
    module: AwsS3,
    options: {
      companionUrl,
      ...rest,
    },
    responseHandler: (file) => ({
      id: file.meta?.key.match(/^cache\/(.+)/)[1], // object key without prefix
      storage: 'cache',
      type,
      metadata: {
        ...file.meta,
        size: file.size,
        filename: file.name,
        mime_type: file.type,
      },
    }),
  };
}

export function uppyRestrictionsToDropzoneProps({
  restrictions,
  ...rest
}: {
  restrictions: Restrictions;
} & DropzoneProps): DropzoneProps {
  return {
    ...(restrictions.maxNumberOfFiles
      ? { maxFiles: restrictions.maxNumberOfFiles }
      : {}),
    ...(restrictions.maxFileSize ? { maxSize: restrictions.maxFileSize } : {}),
    ...(restrictions.minFileSize ? { minSize: restrictions.minFileSize } : {}),
    ...rest,
  };
}
