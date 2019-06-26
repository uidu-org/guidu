import { colors, fontSize, gridSize, math, themed } from '@uidu/theme';

const activeBackgroundColor = themed({ light: colors.B75, dark: colors.DN30 });
const hoverBackgroundColor = themed({ light: colors.N20, dark: colors.DN60 });
const selectedBackgroundColor = themed({ light: colors.N0, dark: colors.DN30 });

const activePrimaryTextColor = themed({
  light: colors.N800,
  dark: colors.DN300,
});
const defaultPrimaryTextColor = themed({
  light: colors.N800,
  dark: colors.DN600,
});
const disabledPrimaryTextColor = themed({
  light: colors.N70,
  dark: colors.DN70,
});
const primaryPrimaryTextColor = themed({
  light: colors.B400,
  dark: colors.B400,
});
const selectedPrimaryTextColor = themed({
  light: colors.N800,
  dark: colors.N800,
});

export const defaultStyle = {
  // control: {
  //   backgroundColor: '#fff',

  //   fontSize: 12,
  //   fontWeight: 'normal',
  // },

  highlighter: {
    padding: 0,
    left: 0,
    overflow: 'inherit',
  },

  input: {
    margin: 0,
    padding: '0.5rem 1rem',
    left: 0,
    border: 0,
    letterSpacing: 'inherit',
    overflow: 'inherit',
  },

  // '&singleLine': {
  //   control: {
  //     display: 'inline-block',

  //     width: 130,
  //   },

  //   highlighter: {
  //     padding: 1,
  //     border: '2px inset transparent',
  //   },

  //   input: {
  //     padding: 1,

  //     border: '2px inset',
  //   },
  // },

  // '&multiLine': {
  //   control: {
  //     fontFamily: 'monospace',

  //     border: '1px solid silver',
  //   },

  //   highlighter: {
  //     padding: 9,
  //   },

  //   input: {
  //     padding: 9,
  //     minHeight: 63,
  //     outline: 0,
  //     border: 0,
  //   },
  // },

  suggestions: {
    list: {
      backgroundColor: 'white',
      // border: '1px solid rgba(0,0,0,0.15)',
      boxShadow:
        '0 4px 8px -2px rgba(9,30,66,0.25), 0 0 1px rgba(9,30,66,0.31)',
      // fontSize: 10,
    },

    item: {
      padding: '0.5rem 1rem',
      // borderBottom: '1px solid rgba(0,0,0,0.15)',

      '&focused': {
        backgroundColor: hoverBackgroundColor(),
        color: defaultPrimaryTextColor(),
      },
    },
  },
};

export const defaultMentionStyle = {
  backgroundColor: hoverBackgroundColor(),
  padding: '0px 3px',
  left: '-3px',
  position: 'relative',
  borderRadius: '4px',
};
