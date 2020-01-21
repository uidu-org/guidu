const fs = require('fs');
const runDevServer = require('@uidu/webpack-config/bin/dev.js');

runDevServer({
  serverOptions: {
    https: {
      key: fs.readFileSync(
        '/Users/andreavanini/Applications/uidu/config/certs/key.pem',
      ),
      cert: fs.readFileSync(
        '/Users/andreavanini/Applications/uidu/config/certs/crt.pem',
      ),
    },
  },
  webpackOptions: {
    resolve: {
      mainFields: ['uidu:src', 'module', 'atlaskit:src', 'browser', 'main'],
    },
  },
}).catch(err => {
  console.log(err);
  process.exit(err);
});
