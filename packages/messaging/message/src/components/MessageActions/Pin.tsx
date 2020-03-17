import Tooltip from '@uidu/tooltip';
import React from 'react';
import { Star } from 'react-feather';

export default function Reply({}) {
  return (
    <Tooltip
      position="top"
      content="Star"
      delay={0}
      tag="button"
      className="btn btn-sm bg-white p-2 text-muted d-flex align-items-center"
    >
      <Star size={16} />
    </Tooltip>
  );
}
