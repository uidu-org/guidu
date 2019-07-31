import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

export default function FormMeta({ className, ...otherProps }) {
  return <div {...otherProps} className={classNames('form-meta', className)} />;
}

FormMeta.defaultProps = {
  className: null,
};

FormMeta.propTypes = {
  className: PropTypes.string,
};
