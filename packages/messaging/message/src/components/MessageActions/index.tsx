import { ButtonGroup } from '@uidu/button';
import React from 'react';
import StyledMessageActions from '../../styled/MessageActions';

export default function MessageActions({ children, hovered }) {
  // if (!hovered) {
  //   return null;
  // }

  return (
    <StyledMessageActions hovered={hovered} tw="flex-grow" role="group">
      <ButtonGroup>{children}</ButtonGroup>
    </StyledMessageActions>
  );
}
