import React from 'react';
import StyledMessageActions from '../../styled/MessageActions';

export default function MessageActions({ children, hovered }) {
  // if (!hovered) {
  //   return null;
  // }

  return (
    <StyledMessageActions
      hovered={hovered}
      className="btn-group btn-group-sm rounded flex-grow-1"
      role="group"
      aria-label="Button group with nested dropdown"
    >
      {children}
    </StyledMessageActions>
  );
}
