import React from 'react';

export default ({ children, sidebar }) => (
  <div
    css={{
      display: 'flex',
      flex: '1 1 auto',
      height: '100%',
      overflow: 'hidden',
    }}
  >
    <div
      css={{
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        flex: '1 1 auto',
      }}
    >
      {children}
    </div>
    {sidebar}
  </div>
);
