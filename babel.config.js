module.exports = function (api) {
  api.cache(true);

  const plugins = [
    // '@loadable/babel-plugin',
    [
      'babel-plugin-styled-components',
      { ssr: true, displayName: true, preprocess: false },
    ],
    '@babel/plugin-transform-destructuring',
    ['@babel/plugin-transform-runtime', { helpers: false, regenerator: true }],
    ['@babel/plugin-transform-regenerator', { async: false }],
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-syntax-export-default-from',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-export-default-from',
    'babel-plugin-add-module-exports',
  ];

  const presets = [
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-typescript',
  ];

  return {
    // env: {
    //   'production:cjs': {
    //     plugins: [
    //       ['babel-plugin-styled-components', { minify: false }],
    //       '@babel/transform-runtime',
    //       'transform-dynamic-import',
    //     ],
    //     presets: [['@babel/env', { modules: 'commonjs' }]],
    //     ignore: [
    //       '**/__mocks__',
    //       '**/__tests__',
    //       '**/__fixtures__',
    //       'node_modules',
    //     ],
    //   },
    //   'production:esm': {
    //     plugins: [
    //       ['babel-plugin-styled-components', { minify: false }],
    //       '@babel/transform-runtime',
    //     ],
    //     presets: [['@babel/env', { modules: false }]],
    //     ignore: [
    //       '**/__mocks__',
    //       '**/__tests__',
    //       '**/__fixtures__',
    //       'node_modules',
    //     ],
    //   },
    //   test: {
    //     presets: ['@babel/env'],
    //     // There is no @babel/ scoped transform for this plugin
    //     plugins: ['transform-dynamic-import'],
    //   },
    // },
    plugins,
    presets,
  };
};
