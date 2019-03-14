import { colors, themed } from '@atlaskit/theme';

/**
 * Convert a hex colour code to RGBA.
 * @param {String} hex Hex colour code.
 * @param {Number} alpha Optional alpha value (defaults to 1).
 *
 */
const hex2rgba = (hex: string, alpha = 1) => {
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    let colorArr = hex.substring(1).split('');

    if (colorArr.length === 3) {
      colorArr = [
        colorArr[0],
        colorArr[0],
        colorArr[1],
        colorArr[1],
        colorArr[2],
        colorArr[2],
      ];
    }

    const color = `0x${colorArr.join('')}`;

    // FIXME: `>>` operand can validly take a string value
    const r = ((color as any) >> 16) & 255;
    const g = ((color as any) >> 8) & 255;
    const b = (color as any) & 255;

    return `rgba(${[r, g, b].join(',')}, ${alpha})`;
  }

  throw new Error('Bad Hex');
};
/* eslint-enable no-bitwise */

export default {
  // Fallbacks
  fallbacks: {
    background: themed({ light: colors.N20A, dark: colors.DN70 }),
    color: themed({ light: colors.N400, dark: colors.DN400 }),
    textDecoration: 'none',
  },

  // Themes
  theme: {
    // Default appearance
    default: {
      background: {
        default: themed({ light: colors.N20A, dark: colors.DN70 }),
        hover: themed({ light: colors.N30A, dark: colors.DN60 }),
        active: themed({ light: hex2rgba(colors.B75, 0.6), dark: colors.B75 }),
        disabled: themed({ light: colors.N20A, dark: colors.DN70 }),
        selected: themed({ light: colors.N700, dark: colors.DN0 }),
        focusSelected: themed({ light: colors.N700, dark: colors.DN0 }),
      },
      boxShadowColor: {
        focus: themed({ light: hex2rgba(colors.B200, 0.6), dark: colors.B75 }),
        focusSelected: themed({
          light: hex2rgba(colors.B200, 0.6),
          dark: colors.B75,
        }),
      },
      color: {
        default: themed({ light: colors.N400, dark: colors.DN400 }),
        active: themed({ light: colors.B400, dark: colors.B400 }),
        disabled: themed({ light: colors.N70, dark: colors.DN30 }),
        selected: themed({ light: colors.N20, dark: colors.DN400 }),
        focusSelected: themed({ light: colors.N20, dark: colors.DN400 }),
      },
    },

    // Primary appearance
    primary: {
      background: {
        default: themed({ light: colors.B400, dark: colors.B100 }),
        hover: themed({ light: colors.B300, dark: colors.B75 }),
        active: themed({ light: colors.B500, dark: colors.B200 }),
        disabled: themed({ light: colors.N20A, dark: colors.DN70 }),
        selected: themed({ light: colors.N700, dark: colors.DN0 }),
        focusSelected: themed({ light: colors.N700, dark: colors.DN0 }),
      },
      boxShadowColor: {
        focus: themed({ light: hex2rgba(colors.B200, 0.6), dark: colors.B75 }),
        focusSelected: themed({
          light: hex2rgba(colors.B200, 0.6),
          dark: colors.B75,
        }),
      },
      color: {
        default: themed({ light: colors.N0, dark: colors.DN30 }),
        disabled: themed({ light: colors.N70, dark: colors.DN30 }),
        selected: themed({ light: colors.N20, dark: colors.DN400 }),
        focusSelected: themed({ light: colors.N20, dark: colors.DN400 }),
      },
    },

    // Warning appearance
    warning: {
      background: {
        default: themed({ light: colors.Y300, dark: colors.Y300 }),
        hover: themed({ light: colors.Y200, dark: colors.Y200 }),
        active: themed({ light: colors.Y400, dark: colors.Y400 }),
        disabled: themed({ light: colors.N20A, dark: colors.DN70 }),
        selected: themed({ light: colors.Y400, dark: colors.Y400 }),
        focusSelected: themed({ light: colors.Y400, dark: colors.Y400 }),
      },
      boxShadowColor: {
        focus: themed({ light: colors.Y500, dark: colors.Y500 }),
        focusSelected: themed({ light: colors.Y500, dark: colors.Y500 }),
      },
      color: {
        default: themed({ light: colors.N800, dark: colors.N800 }),
        disabled: themed({ light: colors.N70, dark: colors.DN30 }),
        selected: themed({ light: colors.N800, dark: colors.N800 }),
        focusSelected: themed({ light: colors.N800, dark: colors.N800 }),
      },
    },

    // Danger appearance
    danger: {
      background: {
        default: themed({ light: colors.R400, dark: colors.R400 }),
        hover: themed({ light: colors.R300, dark: colors.R300 }),
        active: themed({ light: colors.R500, dark: colors.R500 }),
        disabled: themed({ light: colors.N20A, dark: colors.DN70 }),
        selected: themed({ light: colors.R500, dark: colors.R500 }),
        focusSelected: themed({ light: colors.R500, dark: colors.R500 }),
      },
      boxShadowColor: {
        focus: themed({ light: colors.R100, dark: colors.R100 }),
        focusSelected: themed({ light: colors.R100, dark: colors.R100 }),
      },
      color: {
        default: themed({ light: colors.N0, dark: colors.N0 }),
        disabled: themed({ light: colors.N70, dark: colors.DN30 }),
        selected: themed({ light: colors.N0, dark: colors.N0 }),
        focusSelected: themed({ light: colors.N0, dark: colors.N0 }),
      },
    },

    // Help appearance
    help: {
      background: {
        default: themed({ light: colors.P400, dark: colors.P400 }),
        hover: themed({ light: colors.P200, dark: colors.P200 }),
        active: themed({ light: colors.P500, dark: colors.P500 }),
        disabled: themed({ light: colors.N20A, dark: colors.DN70 }),
        selected: themed({ light: colors.N700, dark: colors.DN0 }),
        focusSelected: themed({ light: colors.R500, dark: colors.R500 }),
      },
      boxShadowColor: {
        focus: themed({ light: colors.P100, dark: colors.P100 }),
        focusSelected: themed({ light: colors.P100, dark: colors.P100 }),
      },
      color: {
        default: themed({ light: colors.N0, dark: colors.N0 }),
        disabled: themed({ light: colors.N70, dark: colors.DN30 }),
        selected: themed({ light: colors.N20, dark: colors.DN400 }),
        focusSelected: themed({ light: colors.N0, dark: colors.N0 }),
      },
    },

    // Link appearance
    link: {
      background: {
        default: themed({ light: 'none', dark: 'none' }),
        selected: themed({ light: colors.N700, dark: colors.N20 }),
        focusSelected: themed({ light: colors.N700, dark: colors.N20 }),
      },
      boxShadowColor: {
        focus: themed({ light: hex2rgba(colors.B200, 0.6), dark: colors.B75 }),
        focusSelected: themed({
          light: hex2rgba(colors.B200, 0.6),
          dark: colors.B75,
        }),
      },
      color: {
        default: themed({ light: colors.B400, dark: colors.B100 }),
        hover: themed({ light: colors.B300, dark: colors.B75 }),
        active: themed({ light: colors.B500, dark: colors.B200 }),
        disabled: themed({ light: colors.N70, dark: colors.DN100 }),
        selected: themed({ light: colors.N20, dark: colors.N700 }),
        focusSelected: themed({ light: colors.N20, dark: colors.N700 }),
      },
      textDecoration: {
        hover: 'underline',
      },
    },

    // Subtle appearance
    subtle: {
      background: {
        default: themed({ light: 'none', dark: 'none' }),
        hover: themed({ light: colors.N30A, dark: colors.DN60 }),
        active: themed({ light: hex2rgba(colors.B75, 0.6), dark: colors.B75 }),
        disabled: themed({ light: 'none', dark: 'none' }),
        selected: themed({ light: colors.N700, dark: colors.DN0 }),
        focusSelected: themed({ light: colors.N700, dark: colors.DN0 }),
      },
      boxShadowColor: {
        focus: themed({ light: hex2rgba(colors.B200, 0.6), dark: colors.B75 }),
        focusSelected: themed({
          light: hex2rgba(colors.B200, 0.6),
          dark: colors.B75,
        }),
      },
      color: {
        default: themed({ light: colors.N400, dark: colors.DN400 }),
        active: themed({ light: colors.B400, dark: colors.B400 }),
        disabled: themed({ light: colors.N70, dark: colors.DN100 }),
        selected: themed({ light: colors.N20, dark: colors.DN400 }),
        focusSelected: themed({ light: colors.N20, dark: colors.DN400 }),
      },
    },

    // Subtle Link appearance
    'subtle-link': {
      background: {
        default: themed({ light: 'none', dark: 'none' }),
        selected: themed({ light: colors.N700, dark: colors.N20 }),
        focusSelected: themed({ light: colors.N700, dark: colors.N20 }),
      },
      boxShadowColor: {
        focus: themed({ light: hex2rgba(colors.B200, 0.6), dark: colors.B75 }),
        focusSelected: themed({
          light: hex2rgba(colors.B200, 0.6),
          dark: colors.B75,
        }),
      },
      color: {
        default: themed({ light: colors.N200, dark: colors.DN400 }),
        hover: themed({ light: colors.N90, dark: colors.B50 }),
        active: themed({ light: colors.N400, dark: colors.DN300 }),
        disabled: themed({ light: colors.N70, dark: colors.DN100 }),
        selected: themed({ light: colors.N20, dark: colors.DN400 }),
        focusSelected: themed({ light: colors.N20, dark: colors.DN400 }),
      },
      textDecoration: {
        hover: 'underline',
      },
    },
  },
};
