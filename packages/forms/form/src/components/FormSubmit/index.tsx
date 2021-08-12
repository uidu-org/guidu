import Button from '@uidu/button';
import React from 'react';

export default function FormSubmit({
  className = 'btn-secondary',
  label = null,
  canSubmit = false,
  loading = false,
}) {
  return (
    <>
      <Button
        className={className}
        isLoading={loading}
        isDisabled={!canSubmit || loading}
        type="submit"
      >
        {label}
      </Button>
    </>
  );
}
