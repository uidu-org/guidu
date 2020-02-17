import React from 'react';
import { Shuffle as ShuffleIcon } from 'react-feather';
import { Trigger } from '../../styled';
import { ShuffleProps } from './types';

export default function Shuffle({ active, onClick }: ShuffleProps) {
  return (
    <Trigger
      activeBg="#fee2d5"
      className="btn"
      active={active}
      onClick={onClick}
    >
      <ShuffleIcon strokeWidth={2} size={14} />
    </Trigger>
  );
}
