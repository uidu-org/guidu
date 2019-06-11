import React from 'react';
import { StyledMainButton } from '../styled';

export default ({ children, ...rest }) => (
  <StyledMainButton type="button" {...rest}>
    {children}
  </StyledMainButton>
);
