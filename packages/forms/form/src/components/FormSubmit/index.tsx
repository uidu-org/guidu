import Button, { ButtonAppearances, ButtonProps } from '@uidu/button';
import React from 'react';

export default function FormSubmit({
  className,
  label = null,
  canSubmit = false,
  children,
  loading = false,
  appearance = 'primary',
  ...rest
}: {
  className?: string;
  label?: any;
  children?: React.ReactChild;
  canSubmit?: boolean;
  loading?: boolean;
  appearance?: ButtonAppearances;
} & ButtonProps) {
  return (
    <Button
      className={className}
      isLoading={loading}
      isDisabled={!canSubmit || loading}
      type="submit"
      appearance={appearance}
      {...rest}
    >
      {children || label}
    </Button>
  );
}
