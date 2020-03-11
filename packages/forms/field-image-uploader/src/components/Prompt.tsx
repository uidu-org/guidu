import React from 'react';
import { UploadCloud } from 'react-feather';

export default function Prompt({ label, help, errors }) {
  return (
    <>
      <div className="text-center">
        <p className="mb-0">
          <UploadCloud size={48} strokeWidth={1} />
        </p>
        {label && <p className="font-weight-bold mb-0 mt-2">{label}</p>}
        {help && <p className="small text-muted">{help}</p>}
      </div>
      {errors.length ? (
        <p className="text-danger">{errors.join(', ')}</p>
      ) : null}
    </>
  );
}
