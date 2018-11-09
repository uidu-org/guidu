import React from 'react';

export default function Inline({ content }) {
  return (
    <div className="alert alert-success alert-dismissible" role="alert">
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
      {content.description}
    </div>
  );
}
