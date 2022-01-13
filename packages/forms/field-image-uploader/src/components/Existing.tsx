import React, { ReactNode } from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';

export interface ExistingProps {
  value: string;
  borderRadius: number;
  className?: string;
  children?: ReactNode;
  onDrop: DropzoneOptions['onDrop'];
  isHovered: boolean;
}

export default function Existing({
  value,
  className,
  borderRadius,
  children,
  onDrop,
  isHovered,
}: ExistingProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
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
        {...(getRootProps() as any)}
        tw="h-full"
        style={{
          borderRadius,
        }}
      >
        <input {...(getInputProps() as any)} />
        {children}
      </div>
    </>
  );
}
