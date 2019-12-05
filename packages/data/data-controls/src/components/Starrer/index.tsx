import Tooltip from '@uidu/tooltip';
import React from 'react';
import { Star } from 'react-feather';
import { Trigger } from '../../styled';

export default function Starrer({ onToggle, currentView }) {
  return (
    <Tooltip content={'Add to favourites'} position="bottom">
      <Trigger
        activeBg="#f1f3f3"
        className="btn"
        active={currentView.favourite}
        onClick={() =>
          onToggle({ ...currentView, favourite: !currentView.favourite })
        }
      >
        <Star
          strokeWidth={2}
          size={14}
          {...(currentView.favourite ? { fill: 'yellow' } : {})}
        />
      </Trigger>
    </Tooltip>
  );
}
