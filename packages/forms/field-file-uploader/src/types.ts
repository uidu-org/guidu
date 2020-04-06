import { FieldBaseProps } from '@uidu/field-base';
import { UppyOptions } from '@uppy/core';
import { XHRUploadOptions } from '@uppy/xhr-upload';
// import { DashboardOptions } from '@uppy/dashboard';

export type FieldFileUploaderProps = {
  options?: Partial<UppyOptions>;
  XHRUploadOptions: Partial<XHRUploadOptions>;
} & FieldBaseProps;
