import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './styles';
import Launcher from './components/Launcher';

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
