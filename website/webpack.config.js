const runDevServer = require('@uidu/webpack-config/bin/dev.js');

runDevServer({
  serverOptions: {
    // for testing on your mobile, disable https
    // and bind address to 0.0.0.0 using ifconfig 192.168.xxx.xxx:9000
    https: false,
    // https: {
    //   key: fs.readFileSync('../../uidu/config/certs/key.pem'),
    //   cert: fs.readFileSync('../../uidu/config/certs/crt.pem'),
    // },
  },
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
