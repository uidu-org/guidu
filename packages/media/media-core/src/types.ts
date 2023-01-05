import AwsS3, { AwsS3Options } from '@uppy/aws-s3';
import XHRUpload, { XHRUploadOptions } from '@uppy/xhr-upload';
import { Attrs } from 'prosemirror-model';

export type FileMetadata = {
  extension?: string;
  filename?: string;
  width?: number;
  height?: number;
  size?: number;
  mime_type?: string;
  crop?: {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  };
};

export type FileType = 'image' | 'video' | 'link' | 'file' | 'smart';

export type FileIdentifier = {
  /** id is shrine identifier */
  id: number | string;
  storage?: string;
  type: FileType;
  metadata: FileMetadata;
  width?: number;
  height?: number;
  url?: string | undefined;
};

export type MediaClientConfig = (attrs: Attrs) => Promise<FileIdentifier>;

export type MediaUploadOptions = {
  module: typeof AwsS3 | typeof XHRUpload;
  options: Partial<XHRUploadOptions> | Partial<AwsS3Options>;
  responseHandler: (response) => FileIdentifier;
};

export interface Media {
  id: number | string;
  file: FileIdentifier;
  [x: string]: any;
}
