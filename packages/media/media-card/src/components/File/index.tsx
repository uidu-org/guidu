import React from 'react';
import MediaCardFooter from '../MediaCardFooter';
import { StyledPoster } from '../Video/styled';

export default function File({ url = null, ...rest }) {
  return (
    <StyledPoster poster={url} role="img">
      <MediaCardFooter {...rest} />
    </StyledPoster>
  );
}
