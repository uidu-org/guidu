const runDevServer = require('@uidu/webpack-config/bin/dev.js');
const fs = require('fs');

let https = undefined;

try {
  const key = fs.readFileSync('../../uidu/config/certs/key.pem');
  const cert = fs.readFileSync('../../uidu/config/certs/crt.pem');
  https = {
    key,
    cert,
  };
} catch (err) {
  console.log(
    'Https is disabled, you should have a uidu certificate to run it with SSL',
  );
}

runDevServer({
  ...(https
    ? {
        serverOptions: {
          // for testing on your mobile, disable https
          // and bind address to 0.0.0.0 using ifconfig 192.168.xxx.xxx:9000
          // https: false,
          https,
        },
      }
    : {}),
  webpackOptions: {
    resolve: {
      alias: {
        'react-native$': 'react-native-web',
      },
    },
  },
}).catch((err) => {
  console.log(err);
  process.exit(err);
});
