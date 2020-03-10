import classNames from 'classnames';
import React from 'react';

export default function FormSubmit({
  className = 'btn-secondary',
  label = null,
  canSubmit = false,
  loading = false,
  loadingLabel = undefined,
}) {
  return (
    <button
      className={classNames('btn', className)}
      type="submit"
      disabled={!canSubmit || loading}
    >
      {loading && (
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        />
      )}
      {loading && loadingLabel && <span className="ml-2">{loadingLabel}</span>}
      {!loading && label}
    </button>
  );
}
