const path = require('path');

module.exports = {
  twin: {
    config: path.resolve(__dirname, './tailwind.config.js'),
    preset: 'styled-components',
  },
};
