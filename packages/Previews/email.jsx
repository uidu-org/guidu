import React from 'react';
import PropTypes from 'prop-types';

export default function PreviewsEmail({
  preview: { subject, replyTo, bodyHTML },
}) {
  return (
    <div className="preview-email">
      <div className="preview-email-subject">
        <strong>Oggetto:</strong> {subject}
      </div>
      <div className="preview-email-subject">
        <strong>Reply-to:</strong> {replyTo}
      </div>
      <hr />
      <div
        className="preview-email-body"
        dangerouslySetInnerHTML={{ __html: bodyHTML }}
      />
    </div>
  );
}

PreviewsEmail.propTypes = {
  preview: PropTypes.shape({
    subject: PropTypes.string.isRequired,
    replyTo: PropTypes.string,
    bodyHTML: PropTypes.string.isRequired,
  }).isRequired,
};
