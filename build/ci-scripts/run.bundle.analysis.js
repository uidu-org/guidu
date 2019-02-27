const boltWebpackAnalyzer = require('bolt-webpack-analyzer');
const chalk = require('chalk');
const axios = require('axios');

const analysisServerEndpoint = process.env.ANALYSIS_SERVER_ENDPOINT;

(async () => {
  try {
    let results = await boltWebpackAnalyzer({
      cwd: process.cwd(),
      ignore: [
        'build/*',
        'packages/css-packs/*',
        'website',
        'packages/core/polyfills',
        'packages/elements/util-data-test',
      ],
    });

    let config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    let res = await axios.post(
      `${analysisServerEndpoint}/bundle-analysis`,
      JSON.stringify(results),
      config,
    );
    // TODO: Either build a new app / webhook for Slack or post the data in Redash
  } catch (err) {
    console.error(chalk.red(err));
    process.exit(1);
  }
})();
