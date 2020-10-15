import Spinner from '@uidu/spinner';
import React from 'react';

export default function DataViewSidebar({ currentView, data }) {
  if (['calendar', 'map'].includes(currentView.kind)) {
    if (!data) {
      return <Spinner />;
    }

    if (currentView.kind === 'calendar') {
      return (
        <>
          <p>List of events</p>
          {data.map((datum) => (
            <p>{datum ? `${datum.createdAt} - ${datum.id}` : 'Group'}</p>
          ))}
        </>
      );
    }

    if (currentView.kind === 'map') {
      return (
        <>
          <p>List of events</p>
        </>
      );
    }
  }
  return null;
}
