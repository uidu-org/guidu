const path = require('path');
const { getLoader, loaderByName } = require('@craco/craco');

module.exports = {
  // style: {
  //   modules: {
  //     localIdentName: '',
  //   },
  //   css: {
  //     loaderOptions: {
  //       /* Any css-loader configuration options: https://github.com/webpack-contrib/css-loader. */
  //     },
  //     loaderOptions: (cssLoaderOptions, { env, paths }) => {
  //       return cssLoaderOptions;
  //     },
  //   },
  //   sass: {
  //     loaderOptions: {
  //       /* Any sass-loader configuration options: https://github.com/webpack-contrib/sass-loader. */
  //     },
  //     loaderOptions: (sassLoaderOptions, { env, paths }) => {
  //       return sassLoaderOptions;
  //     },
  //   },
  //   postcss: {
  //     mode: 'extends' /* (default value) */ || 'file',
  //     plugins: [],
  //     loaderOptions: {
  //       /* Any postcss-loader configuration options: https://github.com/postcss/postcss-loader. */
  //     },
  //     loaderOptions: (postcssLoaderOptions, { env, paths }) => {
  //       return postcssLoaderOptions;
  //     },
  //   },
  // },
  // eslint: {
  //   enable: true,
  //   mode: 'extends' /* (default value) */ || 'file',
  //   configure: {
  //     /* Any eslint configuration options: https://eslint.org/docs/user-guide/configuring */
  //   },
  //   configure: (eslintConfig, { env, paths }) => {
  //     return eslintConfig;
  //   },
  //   loaderOptions: {
  //     /* Any eslint-loader configuration options: https://github.com/webpack-contrib/eslint-loader. */
  //   },
  //   loaderOptions: (eslintOptions, { env, paths }) => {
  //     return eslintOptions;
  //   },
  // },
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
        path.resolve(__dirname, '../packages/checkbox/src'),
        path.resolve(__dirname, '../packages/checkbox/examples'),
        path.resolve(__dirname, '../packages/checkbox/docs'),

        path.resolve(__dirname, '../packages/form/src'),
        path.resolve(__dirname, '../packages/form/examples'),
        path.resolve(__dirname, '../packages/form/docs'),

        path.resolve(__dirname, '../packages/docs/src'),
        path.resolve(__dirname, '../packages/docs/examples'),
        path.resolve(__dirname, '../packages/docs/docs'),

        path.resolve(__dirname, '../packages/button/src'),
        path.resolve(__dirname, '../packages/button/examples'),
        path.resolve(__dirname, '../packages/button/docs'),

        path.resolve(__dirname, '../packages/field-base/src'),
        path.resolve(__dirname, '../packages/field-base/examples'),
        path.resolve(__dirname, '../packages/field-base/docs'),
      ];

      webpackConfig.resolve = {
        mainFields: ['uidu:src', 'main'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      };

      webpackConfig.module.rules.unshift({
        test: /.mdx$/,
        use: '@mdx-js/loader',
      });
      return webpackConfig;
    },
  },
};
