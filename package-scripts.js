const npsUtils = require('nps-utils');

const { series, concurrent, rimraf } = npsUtils;

module.exports = {
  scripts: {
    dev: concurrent.nps('build.babel.esm --watch'),
    build: {
      description: 'clean dist directory and run all builds',
      default: series(
        concurrent.nps('build.pkg', 'build.babel.cjs', 'build.babel.esm'),
      ),
      pkg:
        "lerna exec --only-fs 'packages/**' -- copy-pkg package.json dist/package.json --only name,version,sideEffects",
      babel: {
        cjs:
          'NODE_ENV=production BABEL_ENV=production:cjs lerna exec --ignore "@uidu/{themes-*,webpack-config,nav-info-loader,fs-loader,changelog-loader}" -- babel --verbose src -d dist/cjs --root-mode upward',
        esm:
          'NODE_ENV=production BABEL_ENV=production:esm lerna exec --ignore "@uidu/{themes-*,webpack-config,nav-info-loader,fs-loader,changelog-loader}" -- babel --verbose src -d dist/esm --root-mode upward',
      },
    },
    flowtypes: {
      default: series(concurrent.nps('flowtypes.cjs', 'flowtypes.esm')),
      esm:
        'bolt workspaces exec --only-fs "$(node ./build/ci-scripts/get.glob.packages.for.tools.js babel flow)" -- flow-copy-source -v -i \'**/__tests__/**\' src dist/esm',
      cjs:
        'bolt workspaces exec --only-fs "$(node ./build/ci-scripts/get.glob.packages.for.tools.js babel flow)" -- flow-copy-source -v -i \'**/__tests__/**\' src dist/cjs',
    },
  },
};

// NODE_ENV=production BABEL_ENV=production:cjs -- babel src -d dist/cjs --root upward
// "build": "                               run-p build:pkg build:babel build:flowtypes && run-p build:typescript build:adf-schema:json-schema --print-label --continue-on-error && yarn build:exception-packages",
// "build:exception-packages": "            yarn build:media-editor:copy-binaries && yarn build:css-reset && yarn build:reduced-ui-pack && run-p build:navigation-next --print-label",
// "build:pkg": "                           bolt workspaces exec --only-fs 'packages/**' -- copy-pkg package.json dist/package.json --only name,version,sideEffects",
// "build:babel": "                         run-p build:babel:cjs build:babel:esm",
// "build:babel:cjs": "                     NODE_ENV=production BABEL_ENV=production:cjs bolt workspaces exec --parallel --only-fs \"$(node ./build/ci-scripts/get.glob.packages.for.tools.js babel)\" -- babel src -d dist/cjs --root-mode upward",
// "build:babel:esm": "                     NODE_ENV=production BABEL_ENV=production:esm bolt workspaces exec --parallel --only-fs \"$(node ./build/ci-scripts/get.glob.packages.for.tools.js babel)\" -- babel src -d dist/esm --root-mode upward",
// "build:typescript": "                    run-p build:typescript:es5 build:typescript:es2015 build:typescript:cli",
// "build:typescript:cli": "                NODE_ENV=production bolt workspaces exec --only-fs \"$(node ./build/ci-scripts/get.glob.packages.for.tools.js typescriptcli)\" -- tsc --project ./build/cli",
// "build:typescript:es5": "                NODE_ENV=production bolt workspaces exec --only-fs \"$(node ./build/ci-scripts/get.glob.packages.for.tools.js typescript)\" -- tsc --project ./build/es5",
// "build:typescript:es2015": "             NODE_ENV=production bolt workspaces exec --only-fs \"$(node ./build/ci-scripts/get.glob.packages.for.tools.js typescript)\" -- tsc --project ./build/es2015",
