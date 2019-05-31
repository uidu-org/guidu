import React from 'react';

export default function Event(props) {
  const { event, title } = props;
  return (
    <div className="card py-1 px-2">
      <small className="text-muted small text-truncate m-0">
        {title}
        {event.desc && ':  ' + event.desc}
      </small>
    </div>
  );
}
