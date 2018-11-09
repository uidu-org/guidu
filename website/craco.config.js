const path = require('path');
const { getLoader, loaderByName } = require('@craco/craco');

module.exports = {
  babel: {
    plugins: [
      '@babel/plugin-transform-destructuring',
      '@babel/plugin-syntax-dynamic-import',
      ['@babel/plugin-proposal-object-rest-spread', { useBuiltIns: true }],
      [
        '@babel/plugin-transform-runtime',
        { helpers: false, regenerator: true },
      ],
      ['@babel/plugin-transform-regenerator', { async: false }],
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      'babel-plugin-add-module-exports',
    ],
    loaderOptions: {
      configFile: path.resolve(__dirname, '../babel.config.js'),
    },
  },
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      const { match } = getLoader(webpackConfig, loaderByName('babel-loader'));

      match.loader.include = [
        path.resolve(__dirname, 'src'),
        path.resolve(__dirname, '../packages'),
        path.resolve(__dirname, '../themes'),
      ];

      webpackConfig.output.filename = '[name].js';
      webpackConfig.resolve = {
        mainFields: ['uidu:src', 'main'],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss'],
        modules: [
          path.resolve(__dirname, '../packages'),
          path.resolve(__dirname, '../themes'),
          'node_modules',
        ],
      };

      webpackConfig.module.rules.unshift({
        test: /.mdx$/,
        use: '@mdx-js/loader',
      });
      return webpackConfig;
    },
  },
};
