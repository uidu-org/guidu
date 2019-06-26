import { getFileTypeIconProps } from '@uifabric/file-type-icons';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import React, { Fragment, PureComponent } from 'react';
import StyledMediaCardFooter from './styled';

export const IconFilename = ({ extension, filename }) => (
  <Fragment>
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
  </Fragment>
);

export default class MediaCardFooter extends PureComponent<any> {
  render() {
    const { extension, filename } = this.props;

    return (
      <StyledMediaCardFooter>
        <IconFilename extension={extension} filename={filename} />
      </StyledMediaCardFooter>
    );
  }
}
