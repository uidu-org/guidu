import { colors } from '@uidu/theme';
import React from 'react';

type Props = { progress: number };

const height = 6;

const ProgressBar = ({ progress }: Props) => (
  <div
    style={{
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      borderRadius: height / 2,
      flex: 1,
      height: height,
      overflow: 'hidden',
      position: 'relative',
    }}
  >
    <Progress progress={progress} />
  </div>
);

const Progress = ({ progress }: Props) => (
  <div
    style={{
      backgroundColor: colors.primary,
      borderRadius: height / 2,
      top: 0,
      left: 0,
      bottom: 0,
      position: 'absolute',
      transition: 'width 333ms',
      width: `${progress}%`,
    }}
  />
);

export default ProgressBar;
