import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import { ServiceAccountLink, State } from '../../../domain';
import FolderViewer from './folderView/folderView';
import Auth from './auth/auth';
import { Wrapper } from './styled';

export interface BrowserStateProps {
  readonly service: ServiceAccountLink;
}

export type BrowserProps = BrowserStateProps;

export class Browser extends Component<BrowserProps> {
  render(): JSX.Element {
    const { service } = this.props;
    const view = service.accountId ? <FolderViewer /> : <Auth />;

    return <Wrapper>{view}</Wrapper>;
  }
}

export default connect<BrowserStateProps, {}, {}, State>(
  ({ view: { service } }) => ({
    service,
  }),
)(Browser);
