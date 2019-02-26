// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { colors } from '@uidu/theme';
import Tooltip from '../src';
import { Target } from './styled';

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const color = {
  relative: 'green',
  absolute: 'yellow',
  fixed: 'red',
};

const boxShadow = `
  0 4px 8px -2px ${colors.N60A},
  0 0 1px ${colors.N60A}
`;

const Parent = styled.div`
  background-color: ${colors.N20};
  border-radius: 5px;
  height: 60px;
  padding: 8px;
  position: ${p => p.pos};
  width: 280px;
  ${p =>
    p.pos === 'fixed'
      ? `box-shadow: 0 4px 8px -2px ${colors.N60A}, 0 0 1px ${colors.N60A};`
      : ''};
`;

type PosTypes = {
  children?: any, // eslint-disable-line react/require-default-props
  pos: 'relative' | 'absolute' | 'fixed',
  rest?: Array<any>, // eslint-disable-line react/require-default-props
};

const Position = ({ children, pos, ...rest }: PosTypes) => (
  <Parent pos={pos} {...rest}>
    <Tooltip content={`Position "${pos}"`}>
      <Target color={color[pos]}>{capitalize(pos)}</Target>
    </Tooltip>
    <p>
      Tooltip container position is <code>{pos}</code>.
    </p>
    {children}
  </Parent>
);

type Props = {};
type State = { pinned: boolean, top: number };

export default class PositionExample extends Component<Props, State> {
  panel: HTMLElement;
  state = { pinned: false, top: 0 };
  pin = () => {
    const { top } = this.panel.getBoundingClientRect();
    this.setState({ pinned: true, top });
  };
  unpin = () => this.setState({ pinned: false });
  ref = (ref: HTMLElement) => {
    this.panel = ref;
  };
  render() {
    const { pinned, top } = this.state;
    const fixedPos = pinned ? 'fixed' : 'relative';
    const fixedStyle = pinned ? { boxShadow, top } : { top: 92 };
    const buttonStyle = { position: 'absolute', right: 8, top: 8 };

    return (
      <div style={{ height: 246, position: 'relative' }}>
        <Position pos="relative" />
        <Position pos="absolute" style={{ top: 84 }} />
        <Position innerRef={this.ref} pos={fixedPos} style={fixedStyle}>
          <button onClick={pinned ? this.unpin : this.pin} style={buttonStyle}>
            {pinned ? 'Unpin' : 'Pin'}
          </button>
        </Position>
      </div>
    );
  }
}
