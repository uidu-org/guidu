import React from 'react';
import { Play } from 'react-feather';
import { StyledPlayButton, StyledPoster } from './styled';

export default ({ poster, onClick }) => (
  <StyledPoster poster={poster} role="img">
    <StyledPlayButton onClick={onClick} type="button">
      <Play />
    </StyledPlayButton>
  </StyledPoster>
);
