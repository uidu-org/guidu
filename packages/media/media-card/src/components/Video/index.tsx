import React from 'react';
import MediaCardFooter from '../MediaCardFooter';
import { StyledPoster } from './styled';

export default function Video({ url = null, ...rest }) {
  return (
    <StyledPoster poster={url} role="img">
      {/* <StyledPlayButton type="button">
      <Play />
    </StyledPlayButton> */}
      <MediaCardFooter {...rest} />
    </StyledPoster>
  );
}
