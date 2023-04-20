import React, { useState } from 'react';
import { getUrlPath } from '../../../utils';
import Image from './Image';
import { ImageLoadCatcher } from './loader';
import Video from './Video';

const isUrl = (url) => getUrlPath(url) !== null;

function CardMedia(props) {
  const { videoUrl, imageUrl, isVideo = false } = props;
  const mediaUrl = isVideo ? videoUrl : imageUrl;
  const [loading, setLoading] = useState(!isUrl(mediaUrl));
  const MediaComponent = isVideo ? Video : Image;

  if (!mediaUrl) return null;

  return (
    <>
      <MediaComponent {...props} loading={loading} />
      {loading && (
        <ImageLoadCatcher src={mediaUrl} onLoad={() => setLoading(false)} />
      )}
    </>
  );
}

export default CardMedia;
