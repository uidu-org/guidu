// @flow

import React, { Component, type Node } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import exenv from 'exenv';
import type { ThemeModes, ThemeProps } from '../types';
import * as colors from '../colors';

import { CHANNEL, DEFAULT_THEME_MODE } from '../constants';

// For forward-compat until everything is upgraded.
import Theme from './Theme';

function getStylesheetResetCSS(state: ThemeProps) {
  const backgroundColor = colors.background(state);
  return `
    body { background: ${backgroundColor}; }
  `;
}

type Props = {
  children: Node,
  mode: ThemeModes,
};

function buildThemeState(mode): ThemeProps {
  return { theme: { [CHANNEL]: { mode } } };
}

const LegacyReset = styled.div`
  background-color: ${colors.background};
  color: ${colors.text};

  a {
    color: ${colors.link};
  }
  a:hover {
    color: ${colors.linkHover};
  }
  a:active {
    color: ${colors.linkActive};
  }
  a:focus {
    outline-color: ${colors.linkOutline};
  }
  h1 {
    color: ${colors.heading};
  }
  h2 {
    color: ${colors.heading};
  }
  h3 {
    color: ${colors.heading};
  }
  h4 {
    color: ${colors.heading};
  }
  h5 {
    color: ${colors.heading};
  }
  h6 {
    color: ${colors.subtleHeading};
  }
  small {
    color: ${colors.subtleText};
  }
`;

export default class AtlaskitThemeProvider extends Component<
  Props,
  ThemeProps,
> {
  stylesheet: any;

  static defaultProps = {
    mode: DEFAULT_THEME_MODE,
  };

  static childContextTypes = {
    hasAtlaskitThemeProvider: PropTypes.bool,
  };

  static contextTypes = {
    hasAtlaskitThemeProvider: PropTypes.bool,
  };

  constructor(props: Props) {
    super(props);
    this.state = buildThemeState(props.mode);
  }

  getChildContext() {
    return { hasAtlaskitThemeProvider: true };
  }

  componentWillMount() {
    if (!this.context.hasAtlaskitThemeProvider && exenv.canUseDOM) {
      const css = getStylesheetResetCSS(this.state);
      this.stylesheet = document.createElement('style');
      this.stylesheet.type = 'text/css';
      this.stylesheet.innerHTML = css;
      if (document && document.head) {
        document.head.appendChild(this.stylesheet);
      }
    }
  }

  componentWillReceiveProps(newProps: Props) {
    if (newProps.mode !== this.props.mode) {
      const newThemeState = buildThemeState(newProps.mode);
      if (this.stylesheet) {
        const css = getStylesheetResetCSS(newThemeState);
        this.stylesheet.innerHTML = css;
      }
      this.setState(newThemeState);
    }
  }

  componentWillUnmount() {
    if (this.stylesheet && document && document.head) {
      document.head.removeChild(this.stylesheet);
      delete this.stylesheet;
    }
  }

  render() {
    const { children } = this.props;
    const { theme } = this.state;
    return (
      /* Wrapping the new provider around the old one provides forward
      compatibility when using the old provider for styled components. This
      allows us to use components converted to use the new API with consumers
      using the old provider along side components that may still be using the
      old theming API. */
      <Theme.Provider value={() => ({ mode: theme[CHANNEL].mode })}>
        <ThemeProvider theme={theme}>
          <LegacyReset>{children}</LegacyReset>
        </ThemeProvider>
      </Theme.Provider>
    );
  }
}
