import React from 'react';

export default function Event(props) {
  const { event, title } = props;
  console.log(event);
  return (
    <small className="small text-truncate m-0">
      {title}
      {event.desc && ':  ' + event.desc}
    </small>
  );
}
