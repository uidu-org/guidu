import React from 'react';
import PropTypes from 'prop-types';

export default function FormActions({ className, ...otherProps }) {
  return <div {...otherProps} className={className} />;
}

FormActions.defaultProps = {
  className: null,
};

FormActions.propTypes = {
  className: PropTypes.string,
};
