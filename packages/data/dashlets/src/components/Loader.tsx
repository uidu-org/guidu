import React from 'react';
import ContentLoader from 'react-content-loader';

export default function Loader(props) {
  return (
    <ContentLoader
      speed={2}
      style={{
        width: '100%',
        height: '100%',
      }}
      backgroundColor="#F5F7F8"
      backgroundOpacity={1}
      foregroundColor="#F5F7F8"
      foregroundOpacity={0.6}
      {...props}
    >
      <rect x="0" y="0" rx="4" ry="4" width="100%" height="100%" />
    </ContentLoader>
  );
}
