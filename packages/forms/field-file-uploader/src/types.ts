import { FieldBaseProps } from '@uidu/field-base';
import { UppyOptions } from '@uppy/core';
// import { DashboardOptions } from '@uppy/dashboard';

export type FieldFileUploaderProps = FieldBaseProps & {
  options: UppyOptions;
};
