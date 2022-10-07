import getVideoId from 'get-video-id';
import React from 'react';

export default function VideoNodeView(props) {
  const {
    node: {
      attrs: { url },
    },
    view,
    view: {
      state: { schema, selection },
    },
    getPos,
  } = props;

  const { service, id } = getVideoId(url);

  const iframeSrc = () => {
    switch (service) {
      case 'youtube':
        return `https://www.youtube.com/embed/${id}`;
      case 'vimeo':
        return `https://vimeo.com/embed/${id}`;
      default:
        return '';
    }
  };

  return (
    <div tw="aspect-w-16 aspect-h-9 rounded">
      <iframe
        src={iframeSrc()}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
        tw="rounded"
      />
    </div>
  );
}
