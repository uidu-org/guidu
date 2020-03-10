import classNames from 'classnames';
import React from 'react';
import { Camera } from 'react-feather';

export default function Empty({
  cropClassName,
  borderRadius,
  label,
  help,
  getRootProps,
  getInputProps,
  errors,
}) {
  console.log(getRootProps());
  return (
    <div {...getRootProps()} className="image-uploader h-100">
      <input {...getInputProps()} />
      <div
        className={classNames(
          'crop d-flex align-items-center justify-content-center h-100 flex-column',
          cropClassName,
        )}
        style={{
          borderRadius,
        }}
      >
        <div className="text-center">
          <Camera size={64} strokeWidth={1} />
          <br />
          {label}
          <br />
          <small className="text-muted">{help}</small>
        </div>
        <p>Drag 'n' drop some files here, or click to select files</p>
        {errors.length ? (
          <p className="text-danger">{errors.join(', ')}</p>
        ) : null}
      </div>
    </div>
  );
}
