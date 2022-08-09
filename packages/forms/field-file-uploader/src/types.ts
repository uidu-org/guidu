import { FieldBaseProps } from '@uidu/field-base';
import { MediaUploadOptions } from '@uidu/media-core';
import { PluginOptions, UppyOptions } from '@uppy/core';
import { DashboardOptions } from '@uppy/dashboard';

export type FieldFileUploaderProps = {
  options?: Partial<UppyOptions>;
  uploadOptions: MediaUploadOptions;
  moduleOptions?: Partial<DashboardOptions> | Partial<PluginOptions>;
} & FieldBaseProps;
