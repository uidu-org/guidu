import { useNode } from '@craftjs/core';
import { PlayCircleIcon, PlayIcon } from '@heroicons/react/24/solid';
import getVideoId from 'get-video-id';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { IconColor, IconSize, VideoProps } from './types';
import VideoSettings from './VideoSettings';

const iconSizeVariants = {
  small: tw`w-12 h-12`,
  medium: tw`w-16 h-16`,
  large: tw`w-20 h-20`,
};

const iconColorVariants = {
  ruby: tw`fill-red-500`,
  black: tw`fill-black`,
  white: tw`fill-white`,
};

const IconWrapper = styled.div<{ $size: IconSize; $color: IconColor }>`
  ${({ $size }) => iconSizeVariants[$size]}
  ${({ $color }) => iconColorVariants[$color]}
`;

export function Video({
  url,
  iconType,
  iconSize = 'small',
  iconColor = 'white',
  ...props
}: VideoProps) {
  const {
    connectors: { connect, drag },
    selected,
    actions: { setProp },
  } = useNode((state) => ({
    selected: state.events.selected,
    dragged: state.events.dragged,
  }));

  const { id, service } = getVideoId(url);

  const [editable, setEditable] = useState(false);

  useEffect(() => {
    if (selected) {
      return;
    }

    setEditable(false);
  }, [selected]);

  const renderVideo = () => {
    const posterSrc = () => {
      switch (service) {
        case 'youtube':
          return `https://img.youtube.com/vi/${id}/0.jpg`;
        case 'vimeo':
          return `https://vimeo.com/embed/${id}`;
        default:
          return '';
      }
    };

    return (
      <div tw="aspect-w-16 aspect-h-9 rounded">
        <img src={posterSrc()} tw="w-full object-cover" />
      </div>
    );
  };

  return (
    <div
      {...props}
      tw="relative"
      ref={(ref) => connect(drag(ref))}
      onClick={() => selected && setEditable(true)}
    >
      <div
        tw="absolute inset-0 flex items-center justify-center z-20"
        aria-hidden="true"
      >
        <IconWrapper $size={iconSize} $color={iconColor}>
          {iconType === 'play-circle' ? (
            <PlayCircleIcon tw="fill-inherit" />
          ) : (
            <PlayIcon tw="fill-inherit" />
          )}
        </IconWrapper>
      </div>
      {renderVideo()}
    </div>
  );
}

export function VideoDefaultProps(): VideoProps {
  return {
    url: '',
    iconType: 'play',
    iconSize: 'small',
    iconColor: 'white',
  };
}

Video.craft = {
  props: VideoDefaultProps,
  related: {
    settings: VideoSettings,
  },
};

export default Video;
