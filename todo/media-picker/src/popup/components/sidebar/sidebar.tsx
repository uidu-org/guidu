import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import UploadIcon from '@atlaskit/icon/glyph/upload';
import DropboxIcon from '@atlaskit/icon/glyph/dropbox';
import GoogleDriveIcon from '@atlaskit/icon/glyph/googledrive';
import { FormattedMessage } from 'react-intl';
import { messages } from '@uidu/media-ui';
import { State } from '../../domain';
import SidebarItem from './item/sidebarItem';
import GiphySidebarItem from './item/giphySidebarItem';
import { Wrapper, ServiceList, Separator, SeparatorLine } from './styled';

export interface SidebarStateProps {
  readonly selected: string;
}

export type SidebarProps = SidebarStateProps;

export class StatelessSidebar extends Component<SidebarProps> {
  render() {
    const { selected } = this.props;

    return (
      <Wrapper>
        <ServiceList>
          <SidebarItem
            serviceName="upload"
            serviceFullName={<FormattedMessage {...messages.upload} />}
            isActive={selected === 'upload'}
          >
            <UploadIcon label="upload" />
          </SidebarItem>
          {this.getCloudPickingSidebarItems()}
        </ServiceList>
      </Wrapper>
    );
  }

  private getCloudPickingSidebarItems = () => {
    const { selected } = this.props;
    return [
      <Separator key="seperator">
        <SeparatorLine />
      </Separator>,
      <GiphySidebarItem key="giphy" isActive={selected === 'giphy'} />,
      <SidebarItem
        key="dropbox"
        serviceName="dropbox"
        serviceFullName="Dropbox"
        isActive={selected === 'dropbox'}
      >
        <DropboxIcon label="dropbox" />
      </SidebarItem>,
      <SidebarItem
        key="google"
        serviceName="google"
        serviceFullName="Google Drive"
        isActive={selected === 'google'}
      >
        <GoogleDriveIcon label="google" />
      </SidebarItem>,
    ];
  };
}

export default connect<SidebarStateProps, undefined, {}, State>(state => ({
  selected: state.view.service.name,
}))(StatelessSidebar);
