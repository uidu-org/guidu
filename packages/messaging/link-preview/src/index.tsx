import axios, { CancelTokenSource } from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CardContent, CardMedia } from './components/Card';
import LinkCard from './components/LinkCard';
import { LinkCardState, LinkPayloadProps, LinkPreviewProps } from './types';
import {
  createApiUrl,
  defaultApiParameters,
  extractFirstUrl,
  fetchFromApi,
  fetchFromApiUrl,
  imageProxy,
  isNil,
  payloadToCardProps,
} from './utils';

function Card({ url, size, title, description, logo, ...props }) {
  return (
    <>
      <CardMedia url={url} cardSize={size} {...props} />
      <CardContent
        className="microlink_card__content"
        title={title}
        description={description}
        url={url}
        cardSize={size}
        logo={logo}
      />
    </>
  );
}

function LinkPreview(props: LinkPreviewProps) {
  const {
    autoPlay,
    controls,
    loop,
    muted,
    playsInline,
    className,
    size,
    onScraped,
    data: initialData,
    url,
  } = props;

  const source = useRef<CancelTokenSource>(null);

  const [isLoading, setIsLoading] = useState<boolean>(!initialData);

  const [state, setState] = useState<LinkCardState>(
    initialData ? payloadToCardProps(initialData) : ({} as LinkCardState),
  );

  const mergeData = useCallback(
    (payload: LinkPayloadProps) => {
      const { title, description, video, image, logo } = payload;

      let imageUrl: string;
      let videoUrl: string;
      let media: string;
      let isVideo = false;

      if (isNil(video)) {
        media = image || logo;
        imageUrl = media;
      } else {
        media = image || logo;
        videoUrl = video;
        imageUrl = media;
        isVideo = true;
      }

      // const { color, background_color: backgroundColor } = media || {};

      setIsLoading(false);
      onScraped(payload);
      setState({
        url,
        title,
        description,
        imageUrl,
        videoUrl,
        isVideo,
        logo,
        // color,
        // backgroundColor,
      });
    },
    [onScraped, url],
  );

  useEffect(() => {
    const fetchData = () => {
      if (initialData) return;

      setIsLoading(true);
      if (source.current)
        source.current.cancel('Operation canceled by the user.');
      source.current = axios.CancelToken.source();

      fetchFromApi({ url }, source.current.token)
        .then(mergeData)
        .catch(console.error);
    };
    fetchData();
  }, [url, initialData, mergeData]);

  const {
    title,
    // color,
    // backgroundColor,
    description,
    logo,
    imageUrl,
    videoUrl,
    isVideo,
  } = state;

  return (
    <LinkCard
      className={className}
      url={url}
      // color={color}
      title={title}
      description={description}
      logo={logo}
      imageUrl={imageUrl}
      videoUrl={videoUrl}
      isVideo={isVideo}
      // backgroundColor={backgroundColor}
      isLoading={isLoading}
      size={size}
      autoPlay={autoPlay}
      controls={controls}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
    />
  );
}

LinkPreview.defaultProps = {
  apiKey: undefined,
  autoPlay: true,
  controls: true,
  media: ['image', 'logo'],
  loop: true,
  muted: true,
  playsInline: true,
  direction: 'ltr',
  size: 'normal',
  onScraped: () => {},
  ...defaultApiParameters,
};

// Microlink.propTypes = {
//   apiKey: PropTypes.string,
//   autoPlay: PropTypes.bool,
//   contrast: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
//   controls: PropTypes.bool,
//   media: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.arrayOf(PropTypes.string),
//   ]),
//   loop: PropTypes.bool,
//   muted: PropTypes.bool,
//   direction: PropTypes.string,
//   playsInline: PropTypes.bool,
//   prerender: PropTypes.oneOf(['auto', true, false]),
//   size: PropTypes.oneOf(['normal', 'large']),
//   url: PropTypes.string,
// };

export {
  imageProxy,
  createApiUrl,
  fetchFromApiUrl,
  fetchFromApi,
  extractFirstUrl,
};

export default LinkPreview;
