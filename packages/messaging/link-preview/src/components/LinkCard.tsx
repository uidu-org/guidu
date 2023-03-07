import React from 'react';
import { LinkCardProps } from '../types';
import { CardContent, CardEmpty, CardMedia, CardWrap } from './Card';

function Card({ url, size, title, description, logo, ...props }) {
  return (
    <>
      <CardMedia url={url} cardSize={size} {...props} />
      <CardContent
        title={title}
        description={description}
        url={url}
        cardSize={size}
        logo={logo}
      />
    </>
  );
}

export default function LinkCard({
  className,
  url,
  title,
  description,
  logo,
  imageUrl,
  videoUrl,
  isVideo,
  isLoading,
  size,
  autoPlay,
  controls,
  loop,
  muted,
  playsInline,
  ...restProps
}: LinkCardProps) {
  return (
    <CardWrap
      className={className}
      href={url}
      title={title}
      cardSize={size}
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
