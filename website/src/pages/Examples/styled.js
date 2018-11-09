// @flow

import React, { type Node } from 'react';
import styled, { css } from 'styled-components';
import { Link } from '../../components/WrappedLink';
import { Transition } from 'react-transition-group';
import { colors } from '@atlaskit/theme';

const NAVBAR_HEIGHT = '48px';

// Layout
// ==============================

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  flex-direction: column;
  display: flex;
`;

export const Content = styled.div`
  position: relative;
  display: flex;
  flex: 0 1 100%;
  flex-direction: column;
`;

// Example Component / Code
// ==============================

const codePaneWidth = 640;
const transitionDuration = 200;
const transitionDistance = {
  entering: '100%',
  entered: 0,
  exiting: '100%',
};

export const ExampleComponentWrapper = styled.div`
  padding-right: ${p => (p.codeIsVisible ? `${codePaneWidth}px` : 0)};
  height: 100%;
  transition: padding ${transitionDuration}ms;
`;
export const ComponentContainer = styled.div`
  background: white;
  box-sizing: border-box;
  height: 100%;
  padding: 20px;
  width: 100%;
`;
export const CodeBox = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: calc(100% - ${NAVBAR_HEIGHT});
  justify-content: flex-end;
  overflow-x: auto;
  position: fixed;
  right: 0;
  top: ${NAVBAR_HEIGHT};
  transform: translate3d(${p => transitionDistance[p.status]}, 0, 0);
  transition: opacity ${transitionDuration}ms, transform ${transitionDuration}ms;
  width: 640px;
  z-index: 3;

  > pre {
    border-radius: 0;
    box-sizing: border-box;
    margin: 0;
    min-height: 100%;
  }
`;
export const CodeContainer = ({
  children,
  show,
}: {
  children: Node,
  show: boolean,
}) => (
  <Transition
    in={show}
    mountOnEnter
    unmountOnExit
    appear
    timeout={transitionDuration}
  >
    {status => {
      if (status === 'exited') return null;

      return <CodeBox status={status}>{children}</CodeBox>;
    }}
  </Transition>
);

// Nav
// ==============================

export const Nav = styled.nav`
  align-items: center;
  box-shadow: 0 1px 0 ${colors.N30A};
  display: flex;
  flex-direction: row;
  height: ${NAVBAR_HEIGHT};
  justify-content: space-between;
  top: 0;
  width: 100%;
  z-index: 2;
`;

export const NavSection = styled.div`
  align-items: center;
  display: flex;
`;

const navButtonStyles = css`
  align-items: center;
  background-color: ${p => (p.isSelected ? colors.primary : 'transparent')};
  border-radius: 50%;
  border: 1px solid;
  border-color: ${p => (p.isSelected ? colors.primary : colors.N80)};
  box-sizing: border-box;
  color: ${p => (p.isSelected ? colors.N0 : colors.N80)};
  display: flex;
  font-size: inherit;
  height: 32px;
  justify-content: center;
  padding: 0;
  transition: all 150ms;
  width: 32px;

  &:not([disabled]):hover,
  &:not([disabled]):focus {
    border-color: ${p => (p.isSelected ? colors.primary : colors.B200)};
    color: ${p => (p.isSelected ? colors.N0 : colors.B200)};
    cursor: pointer;
    outline: 0;
    text-decoration: none;
  }
`;

export const NavButton = styled.button`
  ${navButtonStyles};
`;
export const NavLink = styled(Link)`
  ${navButtonStyles};
`;

// Misc.
// ==============================

export const Control = styled.div`
  display: inline-block;

  & + & {
    margin-left: 2px;
  }
`;

export const ErrorMessage = styled.div`
  background-color: ${colors.R400};
  border-radius: 4px;
  color: white;
  font-size: 120%;
  padding: 1em;
`;
