import { useController, Wrapper } from '@uidu/field-base';
import React from 'react';
import { FieldMentionsProps } from '../types';
import FieldMentionsStateless from './FieldMentionsStateless';

export default function FieldMentions({
  onChange = () => {},
  value: defaultValue,
  name,
  forwardedRef,
  ...rest
}: FieldMentionsProps) {
  const { field, wrapperProps, inputProps } = useController({
    name,
    defaultValue,
    onChange,
    ...rest,
  });

  const handleChange = (_event, value, plainTextValue, mentions) => {
    if (value === '') {
      field.onChange('');
      onChange(name, '');
    } else {
      field.onChange({
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
    <Wrapper {...wrapperProps}>
      <FieldMentionsStateless
        {...rest}
        {...inputProps}
        onChange={handleChange}
      />
    </Wrapper>
  );
}
