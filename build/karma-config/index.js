const constants = require('karma').constants;
const puppeteer = require('puppeteer');
const ChromiumRevision = require('puppeteer/package.json').puppeteer
  .chromium_revision;

const boltQuery = require('bolt-query');
const path = require('path');
const babelPolyfill = require.resolve('@babel/polyfill');
const customEventPolyfill = require.resolve('custom-event-polyfill');
const entry = require.resolve('./entry');
const browserFetcher = puppeteer.createBrowserFetcher();

const webpackConfig = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: require.resolve('ts-loader'),
        options: {
          transpileOnly: true,
        },
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: require.resolve('babel-loader'),
        options: {
          babelrc: true,
          rootMode: 'upward',
          envName: 'production:cjs',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
    alias: {
      sinon: 'sinon/pkg/sinon',
    },
  },
  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
    'react-addons-test-utils': 'react-dom',
  },
};

async function getAliases(cwd) {
  const results = await boltQuery({
    cwd,
    projectFiles: {
      releases: 'releases/*.md',
      patterns: 'patterns/**/*.{js,ts,tsx}',
    },
    workspaceFiles: {
      docs: 'docs/**/*.{js,ts,tsx}',
      examples: 'examples/**/*.{js,ts,tsx}',
    },
  });

  return results.workspaces.reduce((acc, workspace) => {
    if (workspace.pkg['atlaskit:src']) {
      acc[workspace.pkg.name] = path.resolve(
        workspace.dir,
        workspace.pkg['atlaskit:src'],
      );
    }

    return acc;
  }, {});
}

async function getKarmaConfig({ cwd, watch, browserstack }) {
  const revisionInfo = await browserFetcher.download(ChromiumRevision);
  process.env.CHROME_BIN = revisionInfo.executablePath;

  const aliases = await getAliases(cwd);
  webpackConfig.resolve.alias = { ...aliases, ...webpackConfig.resolve.alias };

  const config = {
    port: 9876,
    files: [babelPolyfill, customEventPolyfill, entry],
    basePath: cwd,
    colors: true,
    frameworks: ['mocha', 'chai'],
    preprocessors: {
      [babelPolyfill]: ['webpack'],
      [customEventPolyfill]: ['webpack'],
      [entry]: ['webpack'],
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      stats: 'errors-only',
    },
    logLevel: constants.LOG_ERROR,
    reportSlowerThan: 500,
    mime: {
      'application/javascript': ['ts', 'tsx'],
    },
    autoWatch: watch,
    singleRun: !watch,
    concurrency: 20,
    reporters: ['mocha'],
    browsers: [watch ? 'Chrome' : 'ChromeHeadless'],
    mochaReporter: {
      showDiff: true,
    },
    client: {
      mocha: {
        timeout: 20000, // avoid timeout on tests in VMs
      },
    },
  };

  if (browserstack) {
    const launchers = {
      internet_explorer_11: {
        browser: 'ie',
        os: 'WINDOWS',
        os_version: '8.1',
        browser_version: '11',
      },
      iphone: {
        os: 'ios',
        os_version: '11.0',
        device: 'iPhone 8',
        real_mobile: false,
      },
      chrome_latest_osx: {
        browser: 'chrome',
        os: 'OS X',
        os_version: 'El Capitan',
      },
      firefox_latest_windows: {
        browser: 'firefox',
        os: 'WINDOWS',
        os_version: '10',
      },
      safari_latest: {
        browser: 'Safari',
        os: 'OS X',
        os_version: 'High Sierra',
        browser_version: '11.1',
      },
      edge_latest: { browser: 'edge', os: 'WINDOWS', os_version: '10' },
    };

    const browsers = Object.keys(launchers);

    browsers.forEach(key => {
      launchers[key].base = 'BrowserStack';
    });

    const time = new Date().getTime();
    Object.assign(config, {
      browserStack: {
        username: process.env.BROWSERSTACK_USERNAME,
        accessKey: process.env.BROWSERSTACK_KEY,
        retryLimit: 5,
        startTunnel: true,
        tunnelIdentifier: process.env.BITBUCKET_COMMIT || 'ak_tunnel',
        localIdentifier: `${process.env.BITBUCKET_COMMIT}_unit_tests`,
        project: 'Atlaskit',
        build: `${process.env.BITBUCKET_BRANCH} ${time} ${
          process.env.BITBUCKET_COMMIT
        }`,
      },
      captureTimeout: 120000,
      browserNoActivityTimeout: 120000,
      reporters: ['mocha', 'BrowserStack'],
      concurrency: 2,
      browserDisconnectTolerance: 5,
      customLaunchers: launchers,
      browsers,
    });
  }

  return config;
}

// Returns the relative paths of all the packages that have browser tests
// i.e ['packages/fabric/editor-core', 'packages/fabric/test-helpers', ...]
async function getPackagesWithKarmaTests() /*: Promise<Array<string>> */ {
  const project /*: any */ = await boltQuery({
    cwd: __dirname,
    workspaceFiles: { karma: '__tests-karma__/**/*.+(js|ts|tsx)' },
  });

  return project.workspaces
    .filter(workspace => workspace.files.karma.length)
    .map(workspace => path.relative(project.dir, workspace.dir));
}

module.exports = { getKarmaConfig, getPackagesWithKarmaTests };
