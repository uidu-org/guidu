import React from 'react';
import { Phone } from 'react-feather';

export default ({ value }) => (
  <div className="d-flex justify-content-between align-items-center">
    <span className="flex-grow-1">{value}</span>
    {value && (
      <a href={`tel:${value}`} className="btn p-1" type="button">
        <Phone size={14} />
      </a>
    )}
  </div>
);
