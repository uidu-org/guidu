import classNames from 'classnames';
import React from 'react';
import { useDropzone } from 'react-dropzone';

export default function Empty({
  cropClassName,
  borderRadius,
  text,
  prompt: Prompt,
  label,
  help,
  onDrop,
  errors,
}) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });
  return (
    <div {...(getRootProps() as any)} className="image-uploader h-100">
      <input {...(getInputProps() as any)} />
      <div
        className={classNames(
          'crop d-flex align-items-center justify-content-center h-100 flex-column',
          cropClassName,
        )}
        style={{
          borderRadius,
        }}
      >
        <Prompt label={label} help={help} errors={errors} />
      </div>
    </div>
  );
}
