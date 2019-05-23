import { ThemeProps, ThemedValue } from '../types';

// @flow
/* eslint-disable prefer-rest-params */
import { css } from 'styled-components';
import getTheme from './getTheme';

type Value = string | number;
type Modes = { light: Value, dark: Value };
type VariantModes = { [string]: Modes };

function themedVariants(variantProp, variants) {
  return (props: ?ThemeProps) => {
    const theme = getTheme(props);
    if (props && props[variantProp] && variants) {
      const modes = variants[props[variantProp]];
      if (modes) {
        return css`
          ${modes[theme.mode]}
        `;
      }
    }
    return css``;
  };
}

export default function themed(
  modesOrVariant: Modes | string,
  variantModes: ?VariantModes,
): ThemedValue {
  if (typeof modesOrVariant === 'string') {
    return themedVariants(modesOrVariant, variantModes);
  }
  const modes = modesOrVariant;
  return (props: ?ThemeProps) => {
    const theme = getTheme(props);
    return css`
      ${modes[theme.mode]}
    `;
  };
}
