import { FieldBaseProps } from '@uidu/field-base';
import { MediaUploadOptions } from '@uidu/media-core';
import { UppyOptions } from '@uppy/core';

export type FieldFileUploaderProps = {
  options?: Partial<UppyOptions>;
  uploadOptions: MediaUploadOptions;
} & FieldBaseProps;
