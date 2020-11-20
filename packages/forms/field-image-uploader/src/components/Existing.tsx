import classNames from 'classnames';
import React from 'react';
import { useDropzone } from 'react-dropzone';

export default function Existing({
  cropClassName,
  value,
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
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...(getRootProps() as any)}
      className="image-uploader h-100"
      style={{
        borderRadius,
      }}
    >
      <input // eslint-disable-next-line react/jsx-props-no-spreading
        {...(getInputProps() as any)}
      />
      <div
        className={classNames(
          'crop d-flex align-items-center justify-content-center h-100',
          cropClassName,
        )}
      >
        <img
          alt={value}
          className={className}
          style={{
            width: '100%',
            // height: '100%',
          }}
          src={value}
        />
      </div>
      {children}
    </div>
  );
}
