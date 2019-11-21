import Button from '@uidu/button';
import { gridSize } from '@uidu/theme';
import React, { Component, ReactNode } from 'react';
import { AlertTriangle } from 'react-feather';
import Flag, { FlagGroup } from '../src';

type State = {
  flags: Array<ReactNode>;
};

export default class ProgrammaticFlagDismissExample extends Component<
  void,
  State
> {
  state = {
    flags: [
      <Flag
        id="flag1"
        key="flag1"
        title="Can I leave yet?"
        description="Dismiss me by clicking the button on the page"
        icon={<AlertTriangle />}
      />,
    ],
  };

  dismissFlag = () => {
    this.setState({ flags: [] });
  };

  render() {
    return (
      <div>
        <p style={{ padding: `${gridSize() * 2}px` }}>
          <Button appearance="primary" onClick={this.dismissFlag}>
            Dismiss the Flag
          </Button>
        </p>
        <FlagGroup>{this.state.flags}</FlagGroup>
      </div>
    );
  }
}
