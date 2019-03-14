// @flow

import React, { Component, type Node } from 'react';
import { colors, layers, gridSize } from '@uidu/theme';
import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown } from 'react-feather';

import { Slide } from './transitions';
import type { DrawerPrimitiveProps, DrawerSize, DrawerOrigin } from './types';

// Misc.
// ------------------------------

const widths: { [DrawerSize]: string | number } = {
  full: '100vw',
  extended: '95vw',
  narrow: 45 * gridSize(),
  medium: 60 * gridSize(),
  wide: 75 * gridSize(),
};

const heights: { [DrawerSize]: string | number } = {
  full: '100vh',
  extended: '95vh',
  narrow: 45 * gridSize(),
  medium: 60 * gridSize(),
  wide: 75 * gridSize(),
};

const icons: { [DrawerOrigin]: React.Element } = {
  left: <ArrowLeft />,
  top: <ArrowUp />,
  right: <ArrowRight />,
  bottom: <ArrowDown />,
};

const positionAndSizes = (size, origin) => {
  const position = {};
  if (origin == 'left' || origin == 'right') {
    position[origin] = 0;
    position.top = 0;
    position.height = '100vh';
    position.width = widths[size];
  } else {
    position[origin] = 0;
    position.left = 0;
    position.width = '100vw';
    position.height = heights[size];
  }
  return position;
};

// Wrapper
// ------------------------------

const Wrapper = ({
  size = 'narrow',
  shouldUnmountOnExit,
  origin,
  ...props
}: {
  children?: Node,
  shouldUnmountOnExit?: boolean,
  origin: $PropertyType<DrawerPrimitiveProps, 'origin'>,
  size: $PropertyType<DrawerPrimitiveProps, 'size'>,
}) => {
  return (
    <div
      css={{
        backgroundColor: colors.N0,
        display: 'flex',
        overflow: 'hidden',
        position: 'fixed',
        zIndex: layers.blanket() + 1,
        ...positionAndSizes(size, origin),
      }}
      {...props}
    />
  );
};

// Content
// ------------------------------

const Content = props => (
  <div
    css={{ flex: 1, marginTop: 3 * gridSize(), overflow: 'auto' }}
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
    const {
      children,
      icon: Icon,
      onClose,
      onCloseComplete,
      ...props
    } = this.props;

    return (
      <Slide component={Wrapper} onExited={onCloseComplete} {...props}>
        <Sidebar>
          <IconWrapper
            onClick={onClose}
            data-test-selector="DrawerPrimitiveSidebarCloseButton"
          >
            {Icon ? <Icon size="large" /> : icons[this.props.origin]}
          </IconWrapper>
        </Sidebar>
        <Content>{children}</Content>
      </Slide>
    );
  }
}
