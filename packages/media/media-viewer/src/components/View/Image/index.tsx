import { FileIdentifier } from '@uidu/media-core';
import React from 'react';

export default function Image({ file }: { file: FileIdentifier }) {
  return (
    <div
    // style={getStyles('view', this.props)}
    // className={className('view', { isFullscreen, isModal })}
    >
      <img
        // {...innerProps}
        // className={className('view-image', { isFullscreen, isModal })}
        alt={file.metadata?.filename}
        src={file.url}
        style={{
          height: 'auto',
          maxHeight: '100vh',
          maxWidth: '100%',
          userSelect: 'none',
        }}
      />
    </div>
  );
}
