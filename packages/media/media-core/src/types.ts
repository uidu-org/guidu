import { AwsS3Options } from '@uppy/aws-s3';
import { XHRUploadOptions } from '@uppy/xhr-upload';

export type FileMetadata = {
  extension?: string;
  filename?: string;
  width?: number;
  height?: number;
  size?: number;
};

export type FileType = 'image' | 'video' | 'link' | 'file' | 'smart';

export type FileIdentifier = {
  /** id is shrine identifier */
  id: number | string;
  storage?: string;
  type: FileType;
  metadata: FileMetadata;
  url?: string | undefined;
};

export type MediaClientConfig = any;

export type MediaUploadOptions = {
  module: any;
  options: Partial<XHRUploadOptions> | Partial<AwsS3Options>;
  responseHandler: (response) => FileIdentifier;
};

export interface Media {
  id: number | string;
  file: FileIdentifier;
  [x: string]: any;
}
