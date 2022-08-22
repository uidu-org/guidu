import { useController, Wrapper } from '@uidu/field-base';
import { SelectStateless } from '@uidu/select';
import React from 'react';
import { useIntl } from 'react-intl';
import { FieldTimeProps } from '../types';
import { generateTimeSlots } from '../utils';

function FieldTimeSelect({
  name,
  className,
  onChange,
  value: defaultValue = '',
  required,
  min,
  max,
  disabled,
  interval = 15,
  start = 0,
  end = 24,
  rules,
  ...rest
}: FieldTimeProps) {
  const { field, wrapperProps, inputProps } = useController({
    name,
    defaultValue,
    onChange,
    rules,
    ...rest,
  });

  const intl = useIntl();
  const timeSlots = generateTimeSlots({ interval, start, end });

  return (
    <Wrapper {...wrapperProps}>
      <SelectStateless
        {...inputProps}
        placeholder="00:00"
        name={name}
        options={timeSlots.map((time) => ({
          id: intl.formatTime(time, { hour: 'numeric', minute: 'numeric' }),
          name: intl.formatTime(time, { hour: 'numeric', minute: 'numeric' }),
        }))}
        onChange={(option) => {
          field.onChange(option.id);
          onChange(name, option.id);
        }}
        onBlur={field.onBlur}
      />
    </Wrapper>
  );
}

export default FieldTimeSelect;
