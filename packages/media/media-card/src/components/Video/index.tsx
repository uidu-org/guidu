import React from 'react';
import MediaCardFooter from '../MediaCardFooter';
import { StyledPoster } from './styled';

export default ({ src, ...rest }) => (
  <StyledPoster poster={src} role="img">
    {/* <StyledPlayButton type="button">
      <Play />
    </StyledPlayButton> */}
    <MediaCardFooter {...rest} />
  </StyledPoster>
);
