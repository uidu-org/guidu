import React from 'react';
import { Play } from 'react-feather';
import MediaCardFooter from '../MediaCardFooter';
import { StyledPlayButton, StyledPoster } from './styled';

export default ({ src, ...rest }) => (
  <StyledPoster poster={src} role="img" {...rest}>
    <StyledPlayButton type="button">
      <Play />
    </StyledPlayButton>
    <MediaCardFooter {...rest} />
  </StyledPoster>
);
