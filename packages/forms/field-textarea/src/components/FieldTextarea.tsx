import { Wrapper } from '@uidu/field-base';
import React from 'react';
import InputControl from './FieldTextareaStateless';

function FieldTextarea({ onChange, onSetValue, name, ...rest }) {
  const handleChange = event => {
    const {
      target: { value },
    } = event;
    onSetValue(value);
    onChange(name, value);
  };

  return (
    <Wrapper {...rest}>
      <InputControl
        {...rest}
        onChange={handleChange}
        // ref={this.element}
      />
    </Wrapper>
  );
}

export default FieldTextarea;
