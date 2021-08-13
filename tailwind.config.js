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
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['"Inter var"', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      backgroundColor: {
        primary: withOpacity('--color-primary'),
        secondary: withOpacity('--color-secondary'),
      },
      // these classes end up like `text-base` and `text-primary`
      textColor: {
        primary: withOpacity('--color-primary'),
        secondary: withOpacity('--color-secondary'),
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
