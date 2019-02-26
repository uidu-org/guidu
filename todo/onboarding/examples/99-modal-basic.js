// @flow
import React, { Component } from 'react';
import Button from '@atlaskit/button';

import { Modal } from '../src';
import welcomeImage from './assets/this-is-new-jira.png';

type State = {
  active: boolean,
};

export default class Example extends Component<{}, State> {
  state: State = { active: false };
  start = () => this.setState({ active: true });
  finish = () => this.setState({ active: false });
  render() {
    const { active } = this.state;

    return (
      <div>
        <Button onClick={this.start}>Launch benefits modal</Button>
        {active && (
          <Modal
            actions={[
              { onClick: this.finish, text: 'Switch to the new JIRA' },
              { onClick: this.finish, text: 'Remind me later' },
            ]}
            heading="Experience your new JIRA"
            image={welcomeImage}
            key="welcome"
          >
            <p>
              Switch context, jump between project, and get back to work quickly
              with our new look and feel.
            </p>
            <p>Take it for a spin and let us know what you think.</p>
          </Modal>
        )}
      </div>
    );
  }
}
