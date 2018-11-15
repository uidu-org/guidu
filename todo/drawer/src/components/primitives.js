// @flow

import React, { Component, type Node } from 'react';
import { colors, layers, gridSize } from '@atlaskit/theme';
import ArrowLeft from '@atlaskit/icon/glyph/arrow-left';

import { Slide } from './transitions';
import type { DrawerPrimitiveProps } from './types';

// Misc.
// ------------------------------

const widths = {
  full: '100vw',
  narrow: 45 * gridSize(),
  medium: 60 * gridSize(),
  wide: 75 * gridSize(),
};

// Wrapper
// ------------------------------

const Wrapper = ({
  width = 'narrow',
  shouldUnmountOnExit,
  ...props
}: {
  children?: Node,
  shouldUnmountOnExit?: boolean,
  width: $PropertyType<DrawerPrimitiveProps, 'width'>,
}) => {
  return (
    <div
      css={{
        backgroundColor: colors.N0,
        display: 'flex',
        height: '100vh',
        left: 0,
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        width: widths[width],
        zIndex: layers.blanket() + 1,
      }}
      {...props}
    />
  );
};

// Content
// ------------------------------

const Content = props => (
  <div
    css={{ flex: 1, paddingTop: 3 * gridSize(), overflow: 'auto' }}
    {...props}
  />
);

// Sidebar / Icons etc.
// ------------------------------

const Sidebar = props => {
  return (
    <div
      css={{
        alignItems: 'center',
        boxSizing: 'border-box',
        color: colors.N500,
        display: 'flex',
        flexShrink: 0,
        flexDirection: 'column',
        height: '100vh',
        paddingBottom: 2 * gridSize(),
        paddingTop: 3 * gridSize(),
        width: 8 * gridSize(),
      }}
      {...props}
    />
  );
};

type IconWrapperProps = { onClick?: (SyntheticMouseEvent<*>) => void };
const IconWrapper = (props: IconWrapperProps) => (
  <button
    type="button"
    css={{
      alignItems: 'center',
      background: 0,
      border: 0,
      borderRadius: '50%',
      color: 'inherit',
      cursor: props.onClick ? 'pointer' : null,
      display: 'flex',
      fontSize: 'inherit',
      height: 5 * gridSize(),
      justifyContent: 'center',
      lineHeight: 1,
      marginBottom: 2 * gridSize(),
      padding: 0,
      width: 5 * gridSize(),

      '&:hover': {
        backgroundColor: props.onClick ? colors.N30A : null,
      },
      '&:active': {
        backgroundColor: props.onClick ? colors.B50 : null,
        outline: 0,
      },
    }}
    {...props}
  />
);

export default class DrawerPrimitive extends Component<DrawerPrimitiveProps> {
  render() {
    const { children, icon: Icon, onClose, ...props } = this.props;

    return (
      <Slide component={Wrapper} {...props}>
        <Sidebar>
          <IconWrapper onClick={onClose}>
            {Icon ? <Icon size="large" /> : <ArrowLeft />}
          </IconWrapper>
        </Sidebar>
        <Content>{children}</Content>
      </Slide>
    );
  }
}
