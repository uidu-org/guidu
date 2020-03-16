import React from 'react';
import { ArrowLeft } from 'react-feather';

export default function ShellHeaderSlideBack({ onSlideBack }) {
  return (
    <div className="navbar-header">
      <a
        href="#"
        className="navbar-brand d-flex align-items-center"
        onClick={onSlideBack}
      >
        <ArrowLeft />
      </a>
    </div>
  );
}
