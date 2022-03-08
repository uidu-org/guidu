import React from 'react';

export default function Event({ event, title }) {
  return (
    <div tw="px-2 py-0.5">
      <small tw="text-sm truncate">
        {title}
        {event.desc && ':  ' + event.desc}
      </small>
    </div>
  );
}
