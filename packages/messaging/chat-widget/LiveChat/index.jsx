import React, { PureComponent } from 'react';
import Launcher from './components/Launcher';
import './styles';

export default class LiveChat extends PureComponent {
  render() {
    return (
      <Launcher
        {...this.props}
        agentProfile={this.props.currentOrganization}
        newMessagesCount={3}
      />
    );
  }
}
