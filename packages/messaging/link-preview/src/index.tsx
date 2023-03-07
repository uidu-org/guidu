import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CardContent, CardEmpty, CardMedia, CardWrap } from './components/Card';
import {
  createApiUrl,
  defaultApiParameters,
  extractFirstUrl,
  fetchFromApi,
  fetchFromApiUrl,
  getUrlPath,
  imageProxy,
  isFunction,
  isNil,
  someProp,
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

function LinkPreview<LinkPreviewProps>(props) {
  const {
    autoPlay,
    controls,
    loop,
    setData,
    muted,
    loading: loadingProp,
    playsInline,
    className,
    size,
    onScraped,
    ...restProps
  } = props;

  const [loading, setLoading] = useState(loadingProp);
  const [state, setState] = useState<any>({});

  const fetchData = () => {
    setLoading(true);
    const { source: oldSource } = state;
    oldSource && oldSource.cancel('Operation canceled by the user.');
    const newSource = axios.CancelToken.source();
    setState({ source: newSource });
    const fetch = isFunction(setData)
      ? Promise.resolve({})
      : fetchFromApi(props, newSource);

    fetch.then((data) => {
      console.log(data);
      mergeData(data);
    });
  };

  const mergeData = (fetchData) => {
    const payload = isFunction(setData)
      ? setData(fetchData)
      : { ...fetchData, ...setData };

    const { title, description, url, video, image, logo } = payload;

    let imageUrl;
    let videoUrl;
    let media: any = {};
    let isVideo = false;

    if (isNil(video)) {
      media = someProp(payload, [].concat(props.media)) || image || logo;
      imageUrl = getUrlPath(media);
    } else {
      media = image || logo;
      videoUrl = getUrlPath(video);
      imageUrl = getUrlPath(media);
      isVideo = true;
    }

    const { color, background_color: backgroundColor } = media || {};

    setLoading(false);
    onScraped(payload);
    setState({
      url,
      color,
      title,
      description,
      imageUrl,
      videoUrl,
      isVideo,
      backgroundColor,
      logo,
    });
  };

  useEffect(fetchData, [props.url, setData]);

  const {
    title,
    color,
    backgroundColor,
    url,
    description,
    logo,
    imageUrl,
    videoUrl,
    isVideo,
  } = state;

  const isLoading = isNil(loadingProp) ? loading : loadingProp;

  return (
    <CardWrap
      className={className ? `microlink_card ${className}` : 'microlink_card'}
      href={url}
      title={title}
      cardSize={size}
      color={color}
      backgroundColor={backgroundColor}
      loading={isLoading}
      {...restProps}
    >
      {isLoading ? (
        <CardEmpty cardSize={size} />
      ) : (
        <Card
          title={title}
          description={description}
          url={url}
          isVideo={isVideo}
          imageUrl={imageUrl}
          videoUrl={videoUrl}
          autoPlay={autoPlay}
          controls={controls}
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          size={size}
          logo={logo}
        />
      )}
    </CardWrap>
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
