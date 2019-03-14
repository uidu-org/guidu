import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import { themed, colors } from '@uidu/theme';
import Button, { ButtonGroup, themeNamespace, ButtonAppearances } from '../src';

const appearances: ButtonAppearances[] = ['primary'];

const theme = {
  primary: {
    background: {
      default: themed({ light: colors.P400, dark: colors.P400 }),
      hover: themed({ light: colors.P200, dark: colors.P200 }),
      active: themed({ light: colors.P500, dark: colors.P500 }),
      disabled: themed({ light: colors.N30, dark: colors.DN70 }),
      selected: themed({ light: colors.R500, dark: colors.R500 }),
    },
    boxShadowColor: {
      focus: themed({ light: colors.P100, dark: colors.P100 }),
    },
    color: {
      default: themed({ light: colors.N0, dark: colors.N0 }),
      disabled: themed({ light: colors.N0, dark: colors.DN30 }),
      selected: themed({ light: colors.N0, dark: colors.N0 }),
    },
  },
};

export default () => (
  <div>
    <h3>Theming a Primary button</h3>
    {appearances.map(appearance => (
      <div key={appearance}>
        <h4>Themed:</h4>
        <ThemeProvider theme={{ [themeNamespace]: theme }}>
          <ButtonGroup>
            <Button appearance={appearance}>Button</Button>
            <Button appearance={appearance} isDisabled>
              Disabled button
            </Button>
            <Button appearance={appearance} isSelected>
              Selected
            </Button>
          </ButtonGroup>
        </ThemeProvider>
        <h4>Un-themed</h4>
        <ButtonGroup>
          <Button appearance={appearance}>Button</Button>
          <Button appearance={appearance} isDisabled>
            Disabled button
          </Button>
          <Button appearance={appearance} isSelected>
            Selected
          </Button>
        </ButtonGroup>
      </div>
    ))}
  </div>
);
