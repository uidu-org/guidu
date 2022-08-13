import React, { forwardRef, HTMLInputTypeAttribute } from 'react';
import StyledInput from '../styled/Input';
import { FieldTextStatelessProps } from '../types';

const getInputMode = ({
  inputMode,
  type,
}: {
  inputMode: FieldTextStatelessProps['inputMode'];
  type: HTMLInputTypeAttribute;
}) => {
  if (inputMode) {
    return inputMode;
  }

  switch (type) {
    case 'tel':
      return 'tel';
    case 'email':
      return 'email';
    case 'url':
      return 'url';
    default:
      return null;
  }
};

const FieldTextStateless = forwardRef((props: FieldTextStatelessProps, ref) => {
  const { inputMode, type } = props;

  return (
    <StyledInput
      tw="background[rgb(var(--body-on-primary-bg))] shadow-sm focus:--tw-ring-color[rgba(var(--brand-primary), .1)] focus:ring-2 focus:border-color[rgb(var(--brand-primary))] block w-full border border-color[rgb(var(--field-border, var(--border)))] rounded py-3 px-4 placeholder-gray-400 disabled:opacity-50 disabled:background[rgba(var(--brand-subtle), .4)]"
      ref={ref}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...(getInputMode({ inputMode, type })
        ? { inputMode: getInputMode({ inputMode, type }) }
        : {})}
    />
  );
});

export default FieldTextStateless;
