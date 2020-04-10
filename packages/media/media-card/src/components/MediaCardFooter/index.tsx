import { Icon } from '@fluentui/react/lib/Icon';
import { getFileTypeIconProps } from '@uifabric/file-type-icons';
import React from 'react';
import StyledMediaCardFooter from './styled';

export default function MediaCardFooter({
  metadata: { extension, filename } = { extension: null, filename: null },
}) {
  return (
    <StyledMediaCardFooter>
      <Icon
        {...getFileTypeIconProps({ extension, size: 16 })}
        style={{
          display: 'flex',
          marginRight: '.5rem',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
      <span className="text-truncate">{filename}</span>
    </StyledMediaCardFooter>
  );
}
