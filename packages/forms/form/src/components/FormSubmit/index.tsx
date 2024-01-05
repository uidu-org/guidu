import Button, { ButtonAppearances, ButtonProps } from '@uidu/button';
import React from 'react';

export default function FormSubmit({
  className,
  label = null,
  canSubmit = false,
  children,
  loading = false,
  appearance = 'primary',
  disabledWhenInvalid = false,
  ...rest
}: {
  className?: string;
  label?: string | null | React.ReactNode;
  children?: React.ReactNode;
  canSubmit?: boolean;
  loading?: boolean;
  appearance?: ButtonAppearances;
  disabledWhenInvalid?: boolean;
} & ButtonProps) {
  return (
    <Button
      className={className}
      isLoading={loading}
      isDisabled={disabledWhenInvalid ? !canSubmit || loading : loading}
      type="submit"
      appearance={appearance}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      {children || label}
    </Button>
  );
}
