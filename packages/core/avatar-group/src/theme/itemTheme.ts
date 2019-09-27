import { itemThemeNamespace } from '@uidu/item';
import { backgroundActive, backgroundOnLayer, N900 } from '@uidu/theme/colors';
import { gridSize } from '@uidu/theme/constants';
import { multiply } from '@uidu/theme/math';

const dropdownPadding = {
  bottom: 1,
  left: multiply(gridSize, 1.5),
  right: multiply(gridSize, 1.5),
  top: 1,
};

// Override specific parts of droplist's item theme
const avatarItemTheme: Record<string, any> = {
  borderRadius: '0px',
  default: {
    background: backgroundOnLayer,
    text: N900,
  },
  active: {
    text: N900,
    background: backgroundActive,
  },
  padding: {
    default: dropdownPadding,
    compact: dropdownPadding,
  },
};

export default {
  [itemThemeNamespace]: avatarItemTheme,
};
