// @flow

import React, { Fragment, type Node } from 'react';
import { keyframes } from 'emotion';
import Transition from 'react-transition-group/Transition';
import { colors } from '@atlaskit/theme';

import {
  transitionDuration,
  transitionDurationMs,
  transitionTimingFunction,
} from '../../../../common/constants';
import { Shadow } from '../../../../common/primitives';
import {
  light,
  withContentTheme,
  ThemeProvider,
  type ProductTheme,
} from '../../../../theme';

const animationFade = state => {
  const defaultStyle = {
    opacity: 0,
    transitionDuration,
    transitionProperty: 'opacity',
    transitionTimingFunction,
  };
  const transitionStyles = {
    entering: { opacity: 0 },
    entered: { opacity: 1 },
  };
  return { ...defaultStyle, ...transitionStyles[state] };
};

/**
 * Component tree structure
 *  - ProductNavigation
 *  - ContainerNavigation
 *    - ContainerOverlay
 *  - InnerShadow
 */

const ScrollProvider = (props: any) => (
  <div
    css={{
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflowX: 'hidden',
      overflowY: 'auto',
      width: '100%',
    }}
    {...props}
  />
);

/**
 * ProductNavigation
 */
type ProductNavigationPrimitiveBaseProps = {
  children: Node,
  theme: ProductTheme,
};

const ProductNavigationPrimitiveBase = ({
  children,
  theme = { mode: light, context: 'product' },
}: ProductNavigationPrimitiveBaseProps) => (
  <div css={theme.mode.contentNav().product}>
    <ScrollProvider>{children}</ScrollProvider>
  </div>
);

const ProductNavigationPrimitive = withContentTheme(
  ProductNavigationPrimitiveBase,
);

type ProductNavigationProps = { children: Node };

type BaseNavigationTheme = {
  children: Node,
};

export const ProductNavigationTheme = ({ children }: BaseNavigationTheme) => (
  <ThemeProvider
    theme={oldTheme => ({ mode: light, ...oldTheme, context: 'product' })}
  >
    <Fragment>{children}</Fragment>
  </ThemeProvider>
);

export const ProductNavigation = (props: ProductNavigationProps) => (
  <ProductNavigationTheme>
    <ProductNavigationPrimitive {...props} />
  </ProductNavigationTheme>
);

const slideIn = keyframes`
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
`;

/**
 * ContainerNavigation
 */
type ContainerNavigationPrimitiveBaseProps = {
  children: Node,
  isEntering: boolean,
  isExiting: boolean,
  isPeekHinting: boolean,
  isPeeking: boolean,
  theme: ProductTheme,
};
const ContainerNavigationPrimitiveBase = ({
  children,
  isEntering,
  isExiting,
  isPeekHinting,
  isPeeking,
  theme,
}: ContainerNavigationPrimitiveBaseProps) => {
  let animationName;
  if (isEntering) animationName = slideIn;

  let transform = null;
  if (isPeekHinting) transform = 'translateX(16px)';
  if (isPeeking) transform = 'translateX(calc(100% - 32px))';
  if (isExiting) transform = 'translateX(100%)';

  return (
    <div
      css={{
        ...theme.mode.contentNav().container,
        animationName,
        animationDuration: transitionDuration,
        animationFillMode: 'forwards',
        animationTimingFunction: transitionTimingFunction,
        transitionProperty: 'boxShadow, transform',
        transitionDuration,
        transitionTimingFunction,
        transform,
      }}
    >
      <ScrollProvider>{children}</ScrollProvider>
    </div>
  );
};

const ContainerNavigationPrimitive = withContentTheme(
  ContainerNavigationPrimitiveBase,
);

type ContainerNavigationProps = {
  children: Node,
  isPeeking: boolean,
};

export const ContainerNavigationTheme = ({ children }: BaseNavigationTheme) => (
  <ThemeProvider theme={{ mode: light, context: 'container' }}>
    <Fragment>{children}</Fragment>
  </ThemeProvider>
);

export const ContainerNavigation = (props: ContainerNavigationProps) => (
  <ContainerNavigationTheme>
    <ContainerNavigationPrimitive {...props} />
  </ContainerNavigationTheme>
);

/**
 * ContainerOverlay
 */
type ContainerOverlayProps = { isVisible: boolean, onClick?: Event => void };

export const ContainerOverlay = ({
  isVisible,
  onClick,
  ...props
}: ContainerOverlayProps) => (
  <div
    css={{
      backgroundColor: colors.N70A,
      cursor: isVisible ? 'pointer' : 'default',
      height: '100%',
      left: 0,
      opacity: isVisible ? 1 : 0,
      pointerEvents: isVisible ? 'all' : 'none',
      position: 'absolute',
      top: 0,
      transitionDuration,
      transitionProperty: 'opacity',
      transitionTimingFunction,
      width: '100%',
      zIndex: 5,
    }}
    onClick={onClick}
    role="presentation"
    {...props}
  />
);

/**
 * InnerShadow
 */
type InnerShadowProps = { isVisible: boolean };

export const InnerShadow = ({ isVisible }: InnerShadowProps) => (
  <Transition
    appear
    in={isVisible}
    mountOnEnter
    timeout={transitionDurationMs}
    unmountOnExit
  >
    {state => {
      const styles = {
        ...animationFade(state),
        left: 'auto',
        right: 0,
      };
      return <Shadow isBold style={styles} />;
    }}
  </Transition>
);
