const npsUtils = require('nps-utils');

const series = npsUtils.series;
const rimraf = npsUtils.rimraf;
const concurrent = npsUtils.concurrent;

module.exports = {
  scripts: {
    build: {
      description: 'clean dist directory and run all builds',
      default: series(
        rimraf('dist'),
        rimraf('lib'),
        concurrent.nps('build.webpack', 'build.babel'),
      ),
      webpack: 'webpack --config webpack.config.js',
      babel:
        'NODE_ENV=production cross-env BABEL_ENV=es babel src --out-dir lib',
      docs: series(rimraf('docs/dist'), 'webpack --progress -p'),
    },
    publish: {
      default: series(
        'nps build.docs',
        'gh-pages -d docs/dist',
        rimraf('docs/dist'),
      ),
    },
  },
};
