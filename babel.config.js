// @flow

module.exports = function(api) {
  api.cache(true);

  const plugins = [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-transform-destructuring',
    '@babel/plugin-syntax-dynamic-import',
    ['@babel/plugin-transform-runtime', { helpers: false, regenerator: true }],
    ['@babel/plugin-transform-regenerator', { async: false }],
    'babel-plugin-add-module-exports',
  ];

  const presets = ['@babel/react', '@babel/flow'];

  return {
    presets,
    plugins,
    env: {
      'production:cjs': {
        plugins: [
          '@babel/transform-runtime',
          ['styled-components', { minify: false }],
          'transform-dynamic-import',
        ],
        presets: [['@babel/env', { modules: 'commonjs' }]],
        ignore: [
          '**/__mocks__',
          '**/__tests__',
          '**/__fixtures__',
          'node_modules',
        ],
      },
      'production:esm': {
        plugins: [
          '@babel/transform-runtime',
          ['styled-components', { minify: false }],
        ],
        presets: [['@babel/env', { modules: false }]],
        ignore: [
          '**/__mocks__',
          '**/__tests__',
          '**/__fixtures__',
          'node_modules',
        ],
      },
      test: {
        presets: ['@babel/env'],
        // There is no @babel/ scoped transform for this plugin
        plugins: ['transform-dynamic-import'],
      },
    },
  };
};
