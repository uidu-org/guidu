import React from 'react';
import Hexagon from 'react-hexagon';
import './index.scss';

export default function HexagonAvatar({ className, src, fill, width, style }) {
  const height = width * 1.125;
  return (
    <div style={{ width, height }} className={className}>
      <Hexagon
        style={{
          stroke: '#fff',
          strokeWidth: 40,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          ...style,
        }}
      >
        <image xlinkHref={src} x="10%" y="10%" width="80%" height="80%" />
      </Hexagon>
    </div>
  );
}
