const path = require('path');

console.log(__dirname);
console.log('ciao');

module.exports = {
  twin: {
    config: path.resolve(__dirname, './tailwind.config.js'),
    preset: 'styled-components',
  },
};
