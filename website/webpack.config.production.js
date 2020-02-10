const runBuild = require('@uidu/webpack-config/bin/build.js');

runBuild().catch(err => {
  console.log(err);
  process.exit(err);
});
