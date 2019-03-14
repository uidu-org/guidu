import { themed, colors } from '@atlaskit/theme';

const buttonTheme = {
  toolbar: {
    background: {
      hover: themed({ light: colors.DN60 }),
      active: themed({ light: colors.B75 }),
    },
    boxShadowColor: {
      focus: themed({ light: colors.B75 }),
    },
    color: {
      default: themed({ light: colors.DN400 }),
      active: themed({ light: colors.B400 }),
      disabled: themed({ light: colors.DN100 }),
    },
  },
  primary: {
    background: {
      default: themed({ light: colors.B100 }),
      hover: themed({ light: colors.B75 }),
      active: themed({ light: colors.B200 }),
      disabled: themed({ light: colors.DN70 }),
    },
    boxShadowColor: {
      focus: themed({ light: colors.B75 }),
    },
    color: {
      default: themed({ light: colors.DN30 }),
    },
  },
};

export default { '@atlaskit-shared-theme/button': buttonTheme };
