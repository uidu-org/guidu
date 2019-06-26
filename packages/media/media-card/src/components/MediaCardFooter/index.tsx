import { getFileTypeIconProps } from '@uifabric/file-type-icons';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import React, { PureComponent } from 'react';
import StyledMediaCardFooter from './styled';

export default class MediaCardFooter extends PureComponent<any> {
  render() {
    const { extension, filename } = this.props;

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
}
