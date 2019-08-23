import Tooltip from '@uidu/tooltip';
import React from 'react';

export default function Switch({
  range,
  onChange,
  comparatorData,
  isPrevious,
}) {
  if (comparatorData) {
    return (
      <Tooltip
        content={isPrevious ? 'Switch to current' : 'Switch to previous'}
        className="ml-auto"
      >
        <a href="#" className="text-muted small" onClick={onChange}>
          {range.from.format('l')} - {range.to.format('l')}
        </a>
      </Tooltip>
    );
  }

  return (
    <span className="text-muted small ml-auto">
      {range.from.format('l')} - {range.to.format('l')}
    </span>
  );
}
