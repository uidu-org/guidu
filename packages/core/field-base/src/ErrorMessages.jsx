import React from 'react';
import PropTypes from 'prop-types';

export default function ErrorMessages({ messages }) {
  return (
    <div className="invalid-feedback">
      {messages.map((message, key) => (
        <p className="mb-1" key={`input-error-${key}`}>
          {message}
        </p>
      ))}
    </div>
  );
}

ErrorMessages.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.string),
};

ErrorMessages.defaultProps = {
  messages: [],
};
