const npsUtils = require('nps-utils');

const series = npsUtils.series;
const rimraf = npsUtils.rimraf;
const concurrent = npsUtils.concurrent;

module.exports = {
  scripts: {
    dev: concurrent.nps('build.babel.esm --watch'),
    build: {
      description: 'clean dist directory and run all builds',
      default: series(concurrent.nps('build.babel.cjs', 'build.babel.esm')),
      babel: {
        cjs:
          'NODE_ENV=production BABEL_ENV=production:cjs lerna exec --parallel --ignore "@uidu/themes-*" -- babel src -d dist/cjs --root-mode upward',
        esm:
          'NODE_ENV=production BABEL_ENV=production:esm lerna exec --parallel --ignore "@uidu/themes-*" -- babel src -d dist/esm --root-mode upward',
      },
    },
  },
};
