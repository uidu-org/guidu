import React from 'react';
import PropTypes from 'prop-types';

export default function PreviewsWebpage({ preview: { bodyHTML } }) {
  return (
    <div className="preview-webpage">
      <div className="preview-webpage-top-bar">
        <div className="preview-webpage-circles">
          <div className="preview-webpage-circle circle-red" />
          <div className="preview-webpage-circle circle-yellow" />
          <div className="preview-webpage-circle circle-green" />
        </div>
      </div>
      <div className="preview-webpage-body">
        <div
          className="preview-webpage-modal"
          dangerouslySetInnerHTML={{ __html: bodyHTML }}
        />
      </div>
    </div>
  );
}

PreviewsWebpage.propTypes = {
  preview: PropTypes.shape({
    bodyHTML: PropTypes.string.isRequired,
  }).isRequired,
};
