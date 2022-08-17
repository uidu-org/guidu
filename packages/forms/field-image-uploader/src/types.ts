import { FieldBaseProps } from '@uidu/field-base';
import { MediaUploadOptions } from '@uidu/media-core';
import { FC } from 'react';
import { ContainerProps } from './components/Container';
import { EmptyProps } from './components/Empty';
import { ExistingProps } from './components/Existing';
import { ProgressProps } from './components/Progress';
import { PromptProps } from './components/Prompt';
import { ToolbarProps } from './components/Toolbar';

export type FieldImageUploaderProps<T> = FieldBaseProps<T> & {
  uploadOptions: MediaUploadOptions;
  toolbar?: FC<ToolbarProps>;
  existing?: FC<ExistingProps>;
  empty?: FC<EmptyProps>;
  prompt?: FC<PromptProps>;
  progress?: FC<ProgressProps>;
  container?: FC<ContainerProps>;
  borderRadius: number;
  max?: number;
  dropzoneProps?: any;
  defaultImageUrl?: string;
};
