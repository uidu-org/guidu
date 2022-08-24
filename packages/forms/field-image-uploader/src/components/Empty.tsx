/* eslint-disable react/jsx-props-no-spreading */

import { uppyRestrictionsToDropzoneProps } from '@uidu/media-core';
import { Restrictions } from '@uppy/core';
import React, { FC } from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';
import { PromptProps } from './Prompt';

export interface EmptyProps extends PromptProps {
  borderRadius: number;
  prompt: FC<PromptProps>;
  onDrop: DropzoneOptions['onDrop'];
  isHovered: boolean;
  restrictions: Restrictions;
}

export default function Empty({
  borderRadius,
  prompt: Prompt,
  label,
  help,
  onDrop,
  errors,
  isHovered,
  restrictions,
}: EmptyProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    ...uppyRestrictionsToDropzoneProps({
      restrictions,
      ...(restrictions.allowedFileTypes
        ? { accept: { 'image/*': restrictions.allowedFileTypes } }
        : {}),
    }),
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
