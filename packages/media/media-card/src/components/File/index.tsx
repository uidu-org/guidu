import React from 'react';
import MediaCardFooter from '../MediaCardFooter';
import { StyledPoster } from '../Video/styled';

export default function File(props) {
  const { file } = props;
  return (
    <StyledPoster poster={file.url} role="img">
    </StyledPoster>
  );
}
