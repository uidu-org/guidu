import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './index.scss';

export default function HrText({ text, className }) {
  return (
    <hr className={classNames('hr-text', className)} data-content={text} />
  );
}

HrText.defaultProps = {
  className: 'hr-md',
};

HrText.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
};
