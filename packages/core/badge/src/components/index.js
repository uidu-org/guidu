// @flow

import GlobalTheme, { type ThemeProp } from '@uidu/theme';
import React, { Component } from 'react';
import { Container } from './Container';
import { Format } from './Format';
import {
  Theme,
  type ThemeAppearance,
  type ThemeProps,
  type ThemeTokens,
} from '../theme';

type Props = {
  /** Affects the visual style of the badge. */
  appearance: ThemeAppearance,

  /** Supercedes the `value` props. The value displayed within the badge. A string can be provided for
  custom-formatted numbers, however badge should only be used in cases where you want to represent
  a number. */
  children: number | string,

  /** The maximum value to display. If value is 100, and max is 50, "50+" will be displayed */
  max: number,
  /** DEPRECATED - this handler is unnecessary as you already know the value and this component does not have any internal state.

  Handler function to be called when the value prop is changed. Called with fn({ oldValue, newValue }) */
  onValueUpdated: ({
    oldValue: number | string,
    newValue: number | string,
  }) => any,

  /** The theme the component should use. */
  theme?: ThemeProp<ThemeTokens, ThemeProps>,

  /** DEPRECATED - use `Max` from `@uidu/format`. The value displayed within the badge. */
  /** DEPRECATED - use children instead. The value displayed within the badge. */
  value?: number,
};

export default class Badge extends Component<Props> {
  static displayName = 'Ak.Badge';
  static defaultProps = {
    appearance: 'default',
    children: 0,
    max: 99,
    onValueUpdated: () => {},
    value: undefined,
  };

  // TODO This can be removed when we remove support for onValueUpdated.
  UNSAFE_componentWillUpdate(nextProps: Props) {
    const { children, onValueUpdated, value } = this.props;
    let oldValue = children;
    let newValue = nextProps.children;

    // This allows us to still prefer the value prop to maintain backward
    // compatibility.
    if (value != null) {
      oldValue = value;
    }
    if (nextProps.value != null) {
      newValue = nextProps.value;
    }

    if (onValueUpdated && newValue !== oldValue) {
      onValueUpdated({ oldValue, newValue });
    }
  }

  render() {
    const { props } = this;
    return (
      <Theme.Provider value={this.props.theme}>
        <GlobalTheme.Consumer>
          {({ mode }) => (
            <Theme.Consumer appearance={props.appearance} mode={mode}>
              {tokens => (
                <Container {...tokens}>
                  {typeof props.children === 'string' ? (
                    props.children
                  ) : (
                    <Format max={props.max}>
                      {props.value || props.children}
                    </Format>
                  )}
                </Container>
              )}
            </Theme.Consumer>
          )}
        </GlobalTheme.Consumer>
      </Theme.Provider>
    );
  }
}
