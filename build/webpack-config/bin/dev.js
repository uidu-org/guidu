#!/usr/bin/env node

// @flow

// Start of the hack for the issue with the webpack watcher that leads to it dying in attempt of watching files
// in node_modules folder which contains circular symbolic links

const DirectoryWatcher = require('watchpack/lib/DirectoryWatcher');
const _oldSetDirectory = DirectoryWatcher.prototype.setDirectory;
DirectoryWatcher.prototype.setDirectory = function(
  directoryPath,
  exist,
  initial,
  type,
) {
  // Any new files created under src/ will trigger a rebuild when in watch mode
  // If we are just adding snapshots or updating tests, we can safely ignore those
  if (directoryPath.includes('__snapshots__')) return;
  if (directoryPath.includes('__image_snapshots__')) return;
  if (directoryPath.includes('__tests__')) return;
  if (directoryPath.includes('__tests-karma__')) return;
  if (!directoryPath.includes('node_modules')) {
    _oldSetDirectory.call(this, directoryPath, exist, initial, type);
  }
};

// End of the hack

const bolt = require('bolt');
const minimatch = require('minimatch');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const historyApiFallback = require('connect-history-api-fallback');
const createConfig = require('../config');
const utils = require('../config/utils');
const { print, devServerBanner, errorMsg } = require('../banner');
let HOST = 'localhost';
let disableHostCheck = false;

if (process.env.VISUAL_REGRESSION) {
  HOST = '0.0.0.0';
  disableHostCheck = true;
}

const PORT = +process.env.ATLASKIT_DEV_PORT || 9000;
const stats = require('../config/statsOptions');

async function runDevServer() {
  const workspaceGlobs = process.argv
    .slice(2)
    .filter(arg => !arg.startsWith('--')) // in case we ever pass other flags to this script
    .map(arg => arg.replace(/["']/g, '')); // remove all quotes (users add them to prevent early glob expansion)
  const report = !!process.argv.find(arg => arg.startsWith('--report'));

  const mode = 'development';
  const websiteEnv = 'local';
  const projectRoot = (await bolt.getProject({ cwd: process.cwd() })).dir;
  const workspaces = await bolt.getWorkspaces();

  const filteredWorkspaces = workspaceGlobs.length
    ? workspaces.filter(ws =>
        workspaceGlobs.some(glob =>
          minimatch(ws.dir, glob, { matchBase: true }),
        ),
      )
    : workspaces; // if no globs were passed, we'll use all workspaces

  const globs =
    workspaceGlobs.length > 0
      ? utils.createWorkspacesGlob(filteredWorkspaces, projectRoot)
      : utils.createDefaultGlob();

  if (!globs.length) {
    console.info(
      `${workspaceGlobs.toString()}: Nothing to run or pattern does not match!`,
    );
    process.exit(0);
  }

  print(
    devServerBanner({
      workspaces: filteredWorkspaces,
      workspacesGlob: workspaceGlobs.toString(),
      port: PORT,
      host: HOST,
      isAll: !(workspaceGlobs.length > 0),
    }),
  );

  //
  // Creating webpack instance
  //

  const config = createConfig({
    globs,
    mode,
    websiteEnv,
    report,
  });

  const compiler = webpack(config);

  //
  // Starting Webpack Dev Server
  //

  const server = new WebpackDevServer(compiler, {
    // Enable gzip compression of generated files.
    compress: true,

    historyApiFallback: true,
    disableHostCheck,

    overlay: true,
    stats,
  });

  return new Promise((resolve, reject) => {
    server.listen(PORT, HOST, err => {
      if (err) {
        console.log(err.stack || err);
        return reject(1);
      }

      server.use(
        historyApiFallback({
          disableDotRule: true,
          htmlAcceptHeaders: ['text/html'],
        }),
      );
    });
  });
}

runDevServer().catch(err => process.exit(err));
