// @flow
import React, { Component } from 'react';
import { AtlaskitThemeProvider } from '@atlaskit/theme';
import Toggle from '@atlaskit/toggle';
import AvatarGroup from '../src';
import { RANDOM_USERS, getAdorableAvatar } from '../examples-util/data';

function getStatus() {
  const chance = Math.random();
  switch (true) {
    case chance < 0.25:
      return 'approved';
    case chance < 0.5:
      return 'declined';
    default:
      return 'locked';
  }
}

const data = RANDOM_USERS.slice(0, 10).map(user => ({
  ...user,
  appearance: 'circle',
  enableTooltip: true,
  size: 'medium',
  src: getAdorableAvatar(user.email),
  status: getStatus(),
}));

type State = {
  theme: 'light' | 'dark',
};

export default class AvatarGroupWithStatus extends Component<{}, State> {
  state = {
    theme: 'light',
  };

  toggleTheme = () => {
    this.setState(({ theme }) => ({
      theme: theme === 'light' ? 'dark' : 'light',
    }));
  };

  render() {
    return (
      <AtlaskitThemeProvider mode={this.state.theme}>
        <p>Dark Mode</p>
        <Toggle onChange={this.toggleTheme} />
        <AvatarGroup
          appearance="stack"
          onAvatarClick={console.log}
          data={data}
          size="large"
        />
      </AtlaskitThemeProvider>
    );
  }
}
