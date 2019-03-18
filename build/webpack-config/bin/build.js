#!/usr/bin/env node

// @flow

const minimatch = require('minimatch');

const bolt = require('bolt');
const webpack = require('webpack');
const createConfig = require('../config');
const { print, buildBanner } = require('../banner');
const utils = require('../config/utils');

async function runBuild() {
  const mode = 'production';
  const websiteEnv = process.env.WEBSITE_ENV || 'local';
  const noMinimize = !!process.argv.find(arg =>
    arg.startsWith('--no-minimize'),
  );
  const report = !!process.argv.find(arg => arg.startsWith('--report'));

  print(buildBanner());

  const config = createConfig({
    mode,
    websiteEnv,
    noMinimize,
    report,
  });
  const compiler = webpack(config);

  //
  // Running Webpack Compiler
  //

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        console.error(err.stack || err);
        if (err.details) console.error(err.details);
        reject(1); // eslint-disable-line
      }

      const statsString = stats.toString('minimal');
      if (statsString) console.log(statsString + '\n');
      if (stats.hasErrors()) reject(2);

      resolve();
    });
  });
}

runBuild().catch(errCode => {
  process.exit(errCode);
});
