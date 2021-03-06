#!/usr/bin/env node

const webpack = require('webpack');
const createConfig = require('../config');
const { print, buildBanner } = require('../banner');

async function runBuild(webpackOptions = {}, websiteOptions = {}) {
  const mode = 'production';
  const websiteEnv = process.env.WEBSITE_ENV || 'production';
  const noMinimize = !!process.argv.find((arg) =>
    arg.startsWith('--no-minimize'),
  );
  const report = !!process.argv.find((arg) => arg.startsWith('--report'));

  print(buildBanner());

  const config = await createConfig({
    mode,
    websiteEnv,
    noMinimize,
    report,
    webpackOptions,
    websiteOptions,
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

module.exports = runBuild;
