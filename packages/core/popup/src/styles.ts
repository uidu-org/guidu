import { layers } from '@uidu/theme/constants';

export const popupCSS = {
  zIndex: layers.layer(),
  ':focus': {
    outline: 'none',
  },
} as const;
