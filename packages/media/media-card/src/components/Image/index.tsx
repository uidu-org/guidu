import React from 'react';
import { StyledImage } from './styled';

export default function Image({ url = null }) {
  return (
    <StyledImage>
      <img src={url} />
    </StyledImage>
  );
}
