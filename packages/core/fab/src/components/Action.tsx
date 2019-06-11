import React from 'react';
import { StyledAction } from '../styled';

export default ({ children, ...rest }) => (
  <StyledAction {...rest}>
    {children}
  </StyledAction>
);
