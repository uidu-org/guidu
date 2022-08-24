/* eslint-disable react/jsx-props-no-spreading */

import { uppyRestrictionsToDropzoneProps } from '@uidu/media-core';
import { Restrictions } from '@uppy/core';
import React, { ReactNode } from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';

export interface ExistingProps {
  value: string;
  borderRadius: number;
  className?: string;
  children?: ReactNode;
  onDrop: DropzoneOptions['onDrop'];
  isHovered: boolean;
  restrictions: Restrictions;
}

export default function Existing({
  value,
  className,
  borderRadius,
  children,
  onDrop,
  isHovered,
  restrictions,
}: ExistingProps) {
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
    <>
      <img
        tw="object-center object-cover"
        alt={value}
        className={className}
        style={{
          width: '100%',
          // height: '100%',
          borderRadius,
        }}
        src={value}
      />
      <div
        {...getRootProps()}
        tw="h-full"
        style={{
          borderRadius,
        }}
      >
        <input {...getInputProps()} />
        {children}
      </div>
    </>
  );
}
