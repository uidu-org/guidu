import Button from '@uidu/button';
import { colors, gridSize, math } from '@uidu/theme';
import React, { Component } from 'react';
import { CheckCircle } from 'react-feather';
import { AutoDismissFlag, FlagGroup } from '../src';
import { AppearanceTypes } from '../src/types';

const appearances: AppearanceTypes[] = [
  'error',
  'info',
  'normal',
  'success',
  'warning',
];
const color = {
  error: colors.R400,
  info: colors.N500,
  normal: colors.N0,
  success: colors.G400,
  warning: colors.Y200,
};

type State = {
  flags: Array<number>;
};

export default class AutoDismissExample extends Component<void, State> {
  state = {
    flags: [],
  };

  componentDidMount() {
    this.addFlag();
  }

  handleDismiss = () => {
    this.setState((prevState) => ({
      flags: prevState.flags.slice(1),
    }));
  };

  addFlag = () => {
    const newFlagId = this.state.flags.length + 1;
    const flags = this.state.flags.slice() as number[];
    flags.splice(0, 0, newFlagId);

    this.setState({ flags });
  };

  render() {
    return (
      <div>
        <p style={{ padding: `${math.multiply(gridSize, 2).toString()}px` }}>
          <Button appearance="primary" onClick={this.addFlag}>
            Add another Flag
          </Button>
        </p>
        <FlagGroup onDismissed={this.handleDismiss}>
          {this.state.flags.map((flagId) => {
            const appearance = appearances[flagId % appearances.length];
            return (
              <AutoDismissFlag
                delay={1800}
                appearance={appearance}
                id={flagId}
                icon={<CheckCircle color={color[appearance]} />}
                key={flagId}
                title={`Flag #${flagId}`}
                description="I will auto dismiss after 8 seconds"
              />
            );
          })}
        </FlagGroup>
      </div>
    );
  }
}
