import { FieldBaseProps } from '@uidu/field-base';
import { FileIdentifier, MediaUploadOptions } from '@uidu/media-core';
import { UppyOptions } from '@uppy/core';

export type FieldFileUploaderProps = {
  options?: Partial<UppyOptions>;
  uploadOptions: MediaUploadOptions;
} & FieldBaseProps<FileIdentifier | FileIdentifier[] | string>;
