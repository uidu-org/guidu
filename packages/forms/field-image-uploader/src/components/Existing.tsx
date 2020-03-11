import classNames from 'classnames';
import React from 'react';
import { useDropzone } from 'react-dropzone';

export default function Existing({
  cropClassName,
  defaultValue,
  className,
  borderRadius,
  children,
  onDrop,
}) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });
  return (
    <div
      {...getRootProps()}
      className="image-uploader h-100"
      style={{
        borderRadius,
      }}
    >
      <input {...(getInputProps() as any)} />
      <div
        className={classNames(
          'crop d-flex align-items-center justify-content-center h-100',
          cropClassName,
        )}
      >
        <img
          alt={defaultValue}
          className={className}
          style={
            {
              // width: '100%',
              // height: '100%',
            }
          }
          src={defaultValue}
        />
      </div>
      {children}
    </div>
  );
}
