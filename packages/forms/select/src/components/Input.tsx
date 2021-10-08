import React from 'react';
import { components } from 'react-select';
import styled from 'styled-components';

const StyledInput = styled.div`
  input {
    box-shadow: none !important;
  }
`;

export default function Input(props) {
  console.log(components);
  if (props.isHidden) {
    return <components.Input {...props} />;
  }
  return (
    <StyledInput>
      <components.Input
        {...props}
        style={{ ...props.style, boxShadow: 'none' }}
      />
    </StyledInput>
  );
}
