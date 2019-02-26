// @flow

import { themeNamespace as buttonThemeNamespace } from '@atlaskit/button';
import { colors, themed } from '@atlaskit/theme';

type Theme = { [string]: any };

export const getSpotlightTheme = (theme: Theme): Theme => ({
  ...theme,
  [buttonThemeNamespace]: {
    ...(theme && theme[buttonThemeNamespace]),
    default: {
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
    'subtle-link': {
      boxShadowColor: {
        focus: themed({ light: colors.P100, dark: colors.P100 }),
      },
      color: {
        default: themed({ light: colors.N0, dark: colors.N0 }),
        hover: themed({ light: colors.P75, dark: colors.P75 }),
        active: themed({ light: colors.P100, dark: colors.P100 }),
        disabled: themed({ light: colors.P500, dark: colors.P500 }),
        selected: themed({ light: colors.N0, dark: colors.N0 }),
      },
    },
  },
});

export const getModalTheme = (theme: Theme): Theme => ({
  ...theme,
  [buttonThemeNamespace]: {
    ...(theme && theme[buttonThemeNamespace]),
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
  },
});
