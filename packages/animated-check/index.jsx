import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './index.scss';

export default function AnimatedCheck({ className, style }) {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 130.2 130.2"
      className={classNames('animated-check', className)}
      style={style}
    >
      <circle
        className="path circle"
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
        strokeMiterlimit="10"
        cx="65.1"
        cy="65.1"
        r="62.1"
      />
      <polyline
        className="path check"
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        strokeMiterlimit="10"
        points="100.2,40.2 51.5,88.8 29.8,67.5 "
      />
    </svg>
  );
}
