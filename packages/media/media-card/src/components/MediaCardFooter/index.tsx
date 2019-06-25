import { getFileTypeIconProps } from '@uifabric/file-type-icons';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import React, { PureComponent } from 'react';
import StyledMediaCardFooter from './styled';

export default class MediaCardFooter extends PureComponent {
  render() {
    console.log(this.props);
    console.log(getFileTypeIconProps({ extension: 'docx', size: 16 }));
    return (
      <StyledMediaCardFooter>
        <Icon
          {...getFileTypeIconProps({ extension: 'docx', size: 16 })}
          style={{
            display: 'flex',
            marginRight: '.5rem',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
        Filename
      </StyledMediaCardFooter>
    );
  }
}
