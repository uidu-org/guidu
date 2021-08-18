import React from 'react';
import ContentLoader from 'react-content-loader';

const ControlLoader = () => (
  <ContentLoader
    style={{
      width: `${(Math.random() * 0.85 + 0.4) * 100}px`,
      height: 24,
      marginLeft: '1rem',
    }}
    height={24}
    width={244}
    speed={2}
    backgroundColor="rgb(var(--body-on-primary-bg))"
    backgroundOpacity={1}
    foregroundColor="rgb(var(--body-on-primary-bg))"
    foregroundOpacity={0.6}
  >
    <rect width="100%" x={0} y="0" rx="12" ry="12" height="24" />
  </ContentLoader>
);

export default function ControlsSkeleton() {
  return (
    <>
      <ControlLoader />
      <ControlLoader />
      <ControlLoader />
      <ControlLoader />
    </>
  );
}
