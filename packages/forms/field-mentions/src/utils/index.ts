const hoverBackgroundColor = 'rgb(var(--brand-subtle))';
const defaultPrimaryTextColor = 'rgb(var(--body-primary))';

export const defaultStyle = {
  control: {
    // lineHeight: 'normal',
  },

  highlighter: {
    padding: 0,
    left: 0,
    overflow: 'inherit',
    border: 0,
  },

  input: {
    margin: 0,
    padding: '0.75rem 1rem',
    // lineHeight: 'normal',
    left: 0,
    border: 0,
    letterSpacing: 'inherit',
    overflow: 'inherit',
    boxShadow: 'none',
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
        backgroundColor: hoverBackgroundColor,
        color: defaultPrimaryTextColor,
      },
    },
  },
};

export const defaultMentionStyle = {
  backgroundColor: hoverBackgroundColor,
  padding: '0px 2px',
  left: '-2px',
  position: 'relative',
  borderRadius: '4px',
};
