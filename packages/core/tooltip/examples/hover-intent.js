// @flow
import React, { Component, Fragment } from 'react';
import { Target } from './styled';
import Tooltip from '../src';

const colors = ['teal', 'blue', 'purple'];

type S = {
  position: 'bottom' | 'mouse',
};

export default class HoverIntent extends Component<{}, S> {
  state = {
    position: 'bottom',
  };

  handleClick = () => {
    this.setState({
      position: this.state.position === 'bottom' ? 'mouse' : 'bottom',
    });
  };

  render() {
    const { position } = this.state;
    return (
      <Fragment>
        <p>
          Click a target to toggle the position of the tooltips between{' '}
          {`'bottom'`} and {`'mouse'`}.
        </p>
        <div style={{ display: 'flex', marginTop: 10 }}>
          {colors.map((c, i) => (
            <Tooltip key={c} content={`Content ${i + 1}`} position={position}>
              <Target
                onClick={this.handleClick}
                color={c}
                style={{ marginRight: 8 }}
              >
                Target {i + 1}
              </Target>
            </Tooltip>
          ))}
        </div>
      </Fragment>
    );
  }
}
