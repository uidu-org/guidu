import React from 'react';
import MediaCardFooter from '../MediaCardFooter';
import { StyledPoster } from '../Video/styled';

export default ({ src, ...rest }) => (
  <StyledPoster poster={src} role="img">
    <MediaCardFooter {...rest} />
  </StyledPoster>
);
