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
  label?: string | null | React.ReactNode;
  children?: React.ReactNode;
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
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      {children || label}
    </Button>
  );
}
