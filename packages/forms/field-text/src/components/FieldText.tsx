import { Wrapper } from '@uidu/field-base';
import React from 'react';
import { FieldTextProps } from '../types';
import InputControl from './FieldTextStateless';

function FieldText({
  component: StatelessInput = InputControl,
  onChange,
  onSetValue,
  name,
  componentRef,
  ...rest
}: FieldTextProps) {
  const element: React.RefObject<any> = React.createRef(componentRef);

  const handleChange = event => {
    const { value } = event.currentTarget;
    onChange(name, value);
    onSetValue(value);
  };

  return (
    <Wrapper {...rest}>
      <StatelessInput {...rest} onChange={handleChange} ref={element} />
    </Wrapper>
  );
}

export default FieldText;
