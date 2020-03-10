import { Wrapper } from '@uidu/field-base';
import React, { forwardRef } from 'react';
import { FieldMentionsProps } from '../types';
import FieldMentionsStateless from './FieldMentionsStateless';

function FieldMentions({
  onSetValue,
  onChange,
  name,
  forwardedRef,
  ...rest
}: FieldMentionsProps) {
  const handleChange = (_event, value, plainTextValue, mentions) => {
    if (value === '') {
      onSetValue('');
      onChange(name, '');
    } else {
      onSetValue({
        value,
        plainTextValue,
        mentions,
      });
      onChange(name, {
        value,
        plainTextValue,
        mentions,
      });
    }
  };

  return (
    <Wrapper {...rest}>
      <FieldMentionsStateless
        {...rest}
        onChange={handleChange}
        ref={forwardedRef}
      />
    </Wrapper>
  );
}

export default forwardRef((props: FieldMentionsProps, ref) => (
  <FieldMentions {...props} forwardedRef={ref} />
));
