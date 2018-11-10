import React from 'react';

export default function Prompt({ content }) {
  return (
    <div className="jumbotron">
      <h1>{content.title}</h1>
      <p>{content.description}</p>
      <p>
        <a className="btn btn-primary btn-lg" href={content.url} role="button">
          {content.cta}
        </a>
      </p>
    </div>
  );
}
