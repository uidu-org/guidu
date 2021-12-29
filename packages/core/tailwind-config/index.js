// see
// - https://tailwindcss.com/docs/presets
// - https://github.com/studiometa/tailwind-config

const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

function withOpacity(variableName) {
  return ({ opacityValue = 1 }) => {
    if (opacityValue) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

module.exports = {
  darkMode: 'media',
  theme: {
    fontFamily: {
      sans: ['"Inter var"', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      typography: {
        primary: {
          css: {
            color: '#333',
            strong: {
              color: '#333',
            },
          },
        },
      },
      backgroundColor: {
        primary: withOpacity('--brand-primary'),
        secondary: withOpacity('--brand-secondary'),
      },
      textColor: {
        primary: withOpacity('--brand-primary'),
        'on-primary': withOpacity('--brand-on-primary'),
        secondary: withOpacity('--brand-secondary'),
        'on-secondary': withOpacity('--brand-on-secondary'),
        muted: colors.gray[400],
      },
      borderColor: {
        primary: withOpacity('--brand-primary'),
        secondary: withOpacity('--brand-secondary'),
      },
      ringColor: {
        primary: withOpacity('--brand-primary'),
        secondary: withOpacity('--brand-secondary'),
      },
      zIndex: {
        card: 100,
        dialog: 300,
        navigation: 200,
        layer: 400,
        blanket: 500,
        modal: 510,
        flag: 600,
        spotlight: 700,
        tooltip: 800,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
