import React from 'react';

export default function Event(props) {
  const { event, title } = props;
  return (
    <small tw="text-sm truncate">
      {title}
      {event.desc && ':  ' + event.desc}
    </small>
  );
}
