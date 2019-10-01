import { ThemeProp } from '@uidu/theme/components';
import React, { PureComponent, ReactNode } from 'react';
import { Theme, ThemeAppearance, ThemeProps, ThemeTokens } from '../theme';
import Container from './Container';
import Content from './Content';

interface Props {
  /** The appearance type. */
  appearance: ThemeAppearance;

  /** Elements to be rendered inside the lozenge. This should ideally be just a word or two. */
  children?: ReactNode;

  /** Determines whether to apply the bold style or not. */
  isBold: boolean;

  /** max-width of lozenge container. Default to 200px. */
  maxWidth: number | string;

  /** The theme the component should use. */
  theme?: ThemeProp<ThemeTokens, ThemeProps>;
}

export default class Lozenge extends PureComponent<Props> {
  static defaultProps = {
    isBold: false,
    appearance: 'default',
    maxWidth: 200,
  };

  render() {
    const { theme, children } = this.props;
    return (
      <Theme.Provider value={theme}>
        <Theme.Consumer {...this.props}>
          {tokens => (
            <Container {...tokens}>
              <Content {...tokens}>{children}</Content>
            </Container>
          )}
        </Theme.Consumer>
      </Theme.Provider>
    );
  }
}
