import React, { CSSProperties } from 'react';
import { StyledImage } from './styled';

export default function Image({
  // crop,
  // stretch,
  file: {
    url = null,
    metadata: { width, height },
  },
}) {
  const imgRatio = width / height;
  const percentSize = '100%';

  // const isCoverStrategy = crop;
  // const isFitStrategy = !crop;

  //  const isImageMoreLandscapyThanContainer =
  //    imgRatio > parentRatio;

  const style: CSSProperties = {
    transform: 'translate(-50%, -50%)',
    maxWidth: percentSize,
  };

  return <StyledImage src={url} style={style} />;
}
