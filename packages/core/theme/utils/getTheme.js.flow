// @flow
import { DEFAULT_THEME_MODE } from '../constants';
import { type Theme, type ThemeProps } from '../types';

const defaultTheme = { mode: DEFAULT_THEME_MODE };

export default function getTheme(
  props: ?(ThemeProps | { theme: Theme }),
): Theme {
  if (props && props.theme && props.theme.__ATLASKIT_THEME__) {
    // $FlowFixMe - cannot narrow type between input types
    return props.theme.__ATLASKIT_THEME__;
  } else if (props && props.theme && props.theme.mode) {
    // $FlowFixMe - cannot narrow type between input types
    return props.theme;
  }
  return defaultTheme;
}
