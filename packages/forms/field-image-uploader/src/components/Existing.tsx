import classNames from 'classnames';
import React from 'react';

export default ({
  cropClassName,
  defaultValue,
  className,
  borderRadius,
  children,
  getRootProps,
  getInputProps,
}) => (
  <div
    {...getRootProps()}
    className="image-uploader h-100"
    style={{
      borderRadius,
    }}
  >
    <input {...getInputProps()} />
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
