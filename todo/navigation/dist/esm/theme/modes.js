import { colors } from '@atlaskit/theme';
import modeGenerator from './modeGenerator';
export var light = modeGenerator({
  product: {
    text: colors.N0,
    background: colors.B500
  }
});
export var dark = modeGenerator({
  product: {
    text: colors.DN500,
    background: colors.DN10
  }
});
export var settings = modeGenerator({
  product: {
    text: colors.N0,
    background: colors.N800
  }
});