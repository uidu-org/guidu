/* eslint-disable react/jsx-props-no-spreading */

import React, { FC } from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';
import { PromptProps } from './Prompt';

export interface EmptyProps extends PromptProps {
  borderRadius: number;
  prompt: FC<PromptProps>;
  onDrop: DropzoneOptions['onDrop'];
  isHovered: boolean;
}

export default function Empty({
  borderRadius,
  prompt: Prompt,
  label,
  help,
  onDrop,
  errors,
  isHovered,
}: EmptyProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });
  return (
    <div {...getRootProps()} tw="h-full">
      <input {...getInputProps()} />
      <div
        tw="flex items-center justify-center h-full flex-col"
        style={{
          borderRadius,
        }}
      >
        <Prompt label={label} help={help} errors={errors} />
      </div>
    </div>
  );
}
