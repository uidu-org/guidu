import React from 'react';
import { StyledProgress } from '../styled';

export interface ProgressProps {
  progress?: number;
}

export default function Progress({ progress }: ProgressProps) {
  if (!progress) {
    return null;
  }

  // TODO: do not use bootstrap progress bar here
  return (
    <StyledProgress className="progress">
      <div
        style={{ width: `${progress * 100}%` }}
        className="progress-bar"
        role="progressbar"
        aria-valuenow={progress * 100}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </StyledProgress>
  );
}
