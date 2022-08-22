import { FieldBaseStatelessProps, StyledInput } from '@uidu/field-base';
import React, { forwardRef, HTMLInputTypeAttribute } from 'react';
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

const FieldTextStateless = forwardRef(
  (props: FieldTextStatelessProps & FieldBaseStatelessProps, ref) => {
    const { inputMode, type, options, fieldState } = props;

    return (
      <StyledInput
        hasError={!!fieldState?.error}
        ref={ref}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...(getInputMode({ inputMode, type })
          ? { inputMode: getInputMode({ inputMode, type }) }
          : {})}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...options}
      />
    );
  },
);

export default FieldTextStateless;
