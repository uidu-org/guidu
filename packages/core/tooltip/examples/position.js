// @flow

import React, { Component } from 'react';
import { Target } from './styled';
import type { Color } from './styled';
import Tooltip from '../src';

const VALID_POSITIONS = ['mouse', 'top', 'right', 'bottom', 'left'];

type Props = { color: Color };
type State = { position: number };

export default class PositionExample extends Component<Props, State> {
  // store the direction as an index and pull it from the list above,
  // just to simplify the `changeDirection` logic
  state = { position: 0 };
  static defaultProps = {
    color: 'blue',
  };

  changeDirection = () => {
    this.setState({
      position: (this.state.position + 1) % VALID_POSITIONS.length,
    });
  };

  render() {
    const position = VALID_POSITIONS[this.state.position];

    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div style={{ padding: '40px 40px' }} onClick={this.changeDirection}>
        <Tooltip content={position} position={position}>
          <Target color={this.props.color}>Target</Target>
        </Tooltip>
      </div>
    );
  }
}
