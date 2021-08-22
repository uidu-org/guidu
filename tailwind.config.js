const defaultTheme = require('tailwindcss/defaultTheme');

function withOpacity(variableName) {
  return ({ opacityValue = 1 }) => {
    if (opacityValue) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

module.exports = {
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['"Inter var"', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      backgroundColor: {
        primary: withOpacity('--brand-primary'),
        secondary: withOpacity('--brand-secondary'),
      },
      // these classes end up like `text-base` and `text-primary`
      textColor: {
        primary: withOpacity('--brand-primary'),
        'on-primary': withOpacity('--brand-on-primary'),
        secondary: withOpacity('--brand-secondary'),
        'on-secondary': withOpacity('--brand-on-secondary'),
      },
      borderColor: {
        primary: withOpacity('--brand-primary'),
        secondary: withOpacity('--brand-secondary'),
      },
      ringColor: {
        primary: withOpacity('--brand-primary'),
        secondary: withOpacity('--brand-secondary'),
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
