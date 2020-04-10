import React from 'react';
import { Play } from 'react-feather';
import Image from '../Image';
import MediaCardFooter from '../MediaCardFooter';
import { StyledPlayButton } from './styled';

export default function Video(props) {
  const { file } = props;
  return (
    <>
      <Image file={file} />
      <StyledPlayButton type="button">
        <Play />
      </StyledPlayButton>
    </>
  );
}
