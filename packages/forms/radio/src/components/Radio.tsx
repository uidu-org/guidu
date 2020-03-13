import { Wrapper } from '@uidu/field-base';
import React from 'react';
import { RadioProps } from '../types';
import RadioStateless from './RadioStateless';

function Radio({ onChange, onSetValue, name, ...rest }: RadioProps) {
  const handleChange = event => {
    const {
      target: { value },
    } = event;
    onSetValue(value);
    onChange(name, value);
  };
  return (
    <Wrapper {...rest}>
      <RadioStateless {...rest} onChange={handleChange} />
    </Wrapper>
  );
}

export default Radio;
