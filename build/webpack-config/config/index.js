const os = require('os');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

const moduleResolveMapBuilder = require('@uidu/multi-entry-tools/module-resolve-map-builder');

const { createDefaultGlob } = require('./utils');
const statsOptions = require('./statsOptions');

const baseCacheDir = path.resolve(
  __dirname,
  '../../../node_modules/.cache/cache-loader',
);

module.exports = async function createWebpackConfig(
  {
    globs = createDefaultGlob(),
    mode = 'development',
    websiteEnv = 'local',
    websiteDir = process.cwd(), // if not passed in, we must be in the websiteDir already
    noMinimize = false,
    report = false,
    entry,
    output,
    webpackOptions,
    websiteOptions,
  } /*: {
    globs?: Array<string>,
    websiteDir?: string,
    mode: string,
    websiteEnv: string,
    noMinimize?: boolean,
    report?: boolean,
    entry?: any,
    output?: any,
    webpackOptions?: any;
    websiteOptions?: any;
  }*/,
) {
  const isProduction = mode === 'production';

  return {
    stats: statsOptions,
    mode,
    performance: {
      // performance hints are used to warn you about large bundles but come at their own perf cost
      hints: false,
    },
    // parallelism: ??, TODO
    entry: entry || {
      main: getEntries({
        isProduction,
        websiteDir,
        entryPath: './src/index.tsx',
      }),
      examples: getEntries({
        isProduction,
        websiteDir,
        entryPath: './src/examples-entry.tsx',
      }),
    },
    output: output || {
      filename: '[name].js',
      path: path.resolve(websiteDir, 'dist'),
      publicPath: '/',
    },
    devtool: isProduction ? false : 'cheap-module-source-map',
    module: {
      rules: [
        {
          test: /SITE_DATA$/,
          loader: require.resolve('@uidu/fs-loader'),
          options: {
            include: [...globs, 'docs/**/*.md'].filter(Boolean),
            exclude: ['**/node_modules/**', 'packages/build/docs/**'],
          },
        },
        {
          test: /NAV_DATA$/,
          loader: require.resolve('@uidu/nav-info-loader'),
          options: {
            /** $FlowFixMe - We have absolutely 0 idea why flow is complaining here */
            include: globs
              .filter((p) => p.includes('package.json'))
              .map((p) => p.replace('/package.json', '')),
            exclude: ['**/node_modules/**', 'packages/build/docs/**'],
            configProps: [
              'name',
              'version',
              'description',
              'uidu',
              'maintainers',
              'peerDependencies',
              'devDependencies',
              'dependencies',
            ],
          },
        },
        {
          test: /CHANGELOG\.md$/,
          exclude: /node_modules/,
          loader: require.resolve('@uidu/changelog-loader'),
        },
        {
          test: /\.md$/,
          exclude: /node_modules|docs/,
          loader: require.resolve('raw-loader'),
        },
        {
          test: /\.md$/,
          include: /docs/,
          exclude: /node_modules/,
          loader: require.resolve('gray-matter-loader'),
        },
        {
          test: /\.mdx$/,
          use: [
            {
              loader: require.resolve('babel-loader'),
            },
            {
              loader: require.resolve('@mdx-js/loader'),
            },
          ],
        },
        {
          test: /\.(js|jsx|mjs)$/,
          exclude: /node_modules|packages\/media\/media-editor\/src\/engine\/core\/binaries\/mediaEditor.js/,
          use: [
            {
              loader: 'thread-loader',
              options: {
                name: 'babel-pool',
              },
            },
            {
              loader: 'babel-loader',
              options: {
                configFile: '../babel.config.js',
                rootMode: 'upward',
                envName: 'production:esm',
                cacheDirectory: path.resolve(baseCacheDir, 'babel'),
              },
            },
          ],
        },
        // {
        //   test: /\.(ts|tsx)?$/,
        //   exclude: /node_modules/,
        //   use: [
        //     {
        //       loader: 'cache-loader',
        //       options: {
        //         cacheDirectory: path.resolve(baseCacheDir, 'ts'),
        //       },
        //     },
        //     {
        //       loader: require.resolve('ts-loader'),
        //       options: {
        //         transpileOnly: true,
        //         getCustomTransformers: path.join(
        //           __dirname,
        //           './ts-transformers.js',
        //         ),
        //       },
        //     },
        //   ],
        //   // options: {
        //   //   transpileOnly: true,
        //   // },
        // },
        {
          test: /\.css$/i,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                // Necessary for external CSS imports to work
                // https://github.com/facebook/create-react-app/issues/2677
                ident: 'postcss',
                plugins: () => [
                  require('postcss-flexbugs-fixes'),
                  require('postcss-preset-env')({
                    autoprefixer: {
                      flexbox: 'no-2009',
                    },
                    stage: 3,
                  }),
                ],
              },
            },
          ],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                // Necessary for external CSS imports to work
                // https://github.com/facebook/create-react-app/issues/2677
                ident: 'postcss',
                plugins: () => [
                  require('postcss-flexbugs-fixes'),
                  require('postcss-preset-env')({
                    autoprefixer: {
                      flexbox: 'no-2009',
                    },
                    stage: 3,
                  }),
                ],
              },
            },
            {
              loader: 'sass-loader',
              options: {},
            },
          ],
        },
        {
          test: /\module.s[ac]ss$/i,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                // Necessary for external CSS imports to work
                // https://github.com/facebook/create-react-app/issues/2677
                ident: 'postcss',
                plugins: () => [
                  require('postcss-flexbugs-fixes'),
                  require('postcss-preset-env')({
                    autoprefixer: {
                      flexbox: 'no-2009',
                    },
                    stage: 3,
                  }),
                ],
              },
            },
            {
              loader: 'sass-loader',
              options: {
                modules: true,
              },
            },
          ],
        },
        {
          test: /\.(gif|jpe?g|png|ico|woff|woff2|eot|ttf)$/,
          loader: require.resolve('url-loader'),
          options: {
            limit: 10000,
          },
        },
        {
          test: /\.svg/,
          use: {
            loader: require.resolve('svg-url-loader'),
            options: {
              limit: 512,
            },
          },
        },
        {
          test: /\.less$/,
          use: ['style-loader', 'css-loader', 'less-loader'],
        },
      ],
    },
    resolve: {
      mainFields: ['uidu:src', 'module', 'browser', 'main'],
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss', '.less'],
      alias: {
        ...(await moduleResolveMapBuilder()),
        'react-native$': 'react-native-web',
      },
      ...(webpackOptions ? webpackOptions.resolve : {}),
    },
    resolveLoader: {
      modules: [
        path.join(__dirname, '..', '..'), // resolve custom loaders from `build/` dir
        'node_modules',
      ],
    },
    plugins: getPlugins({
      websiteDir,
      isProduction,
      websiteEnv,
      report,
      websiteOptions,
    }),
    optimization: getOptimizations({
      isProduction,
      noMinimizeFlag: noMinimize,
    }),
  };
};

function getPlugins(
  {
    websiteDir,
    isProduction,
    websiteEnv,
    report,
    websiteOptions = {},
  } /*: { websiteDir: string, websiteEnv: string, report: boolean, isProduction: boolean, websiteOptions: any } */,
) {
  const faviconPath = path.join(
    websiteDir,
    `public/favicon${!isProduction ? '-dev' : ''}.ico`,
  );
  const HTMLPageTitle =
    websiteOptions.HTMLPageTitle ||
    `GUIdu by uidu${!isProduction ? ' - DEV' : ''}`;
  const plugins = [
    new HtmlWebpackPlugin({
      template: path.join(websiteDir, 'public/index.html.ejs'),
      title: HTMLPageTitle,
      favicon: faviconPath,
      excludeChunks: ['examples'],
    }),

    new HtmlWebpackPlugin({
      filename: 'examples.html',
      title: HTMLPageTitle,
      template: path.join(websiteDir, 'public/examples.html.ejs'),
      favicon: faviconPath,
      excludeChunks: ['main'],
    }),

    new webpack.DefinePlugin({
      WEBSITE_ENV: `"${websiteEnv}"`,
      BASE_TITLE: `"GUIdu by uidu ${!isProduction ? '- DEV' : ''}"`,
      DEFAULT_META_DESCRIPTION: `"GUIdu is the official component library for uidu's Design System."`,
    }),
  ];

  plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: report ? 'static' : 'disabled',
      generateStatsFile: true,
      openAnalyzer: report,
      logLevel: 'error',
      statsOptions: { ...statsOptions, assets: true, modules: true },
      defaultSizes: 'gzip',
    }),
  );

  return plugins;
}

//
function getEntries({ isProduction, entryPath, websiteDir }) {
  const absEntryPath = path.join(websiteDir, entryPath);
  if (isProduction) {
    return absEntryPath;
  }
  const port = process.env.UIDU_DEV_PORT || '9000';
  const devServerPath = `${require.resolve(
    'webpack-dev-server/client',
  )}?http://localhost:${port}/`;
  return [devServerPath, absEntryPath];
}

function getOptimizations({ isProduction, noMinimizeFlag }) {
  if (!isProduction) {
    // If we are in development, use all of webpack's default optimizations ("do nothing")
    return undefined;
  }
  const terserPlugin = new TerserPlugin({
    parallel: Math.max(os.cpus().length - 1, 1),
    terserOptions: {
      compress: {
        // Disabling following options speeds up minimization by 20 – 30s
        // without any significant impact on a bundle size.
        arrows: false,
        booleans: false,
        collapse_vars: false,

        // https://product-fabric.atlassian.net/browse/MSW-436
        comparisons: false,
        // We disables a lot of these rules because they don't effect the size very much, but cost a lot
        // of time
        computed_props: false,
        hoist_funs: false,
        hoist_props: false,
        hoist_vars: false,
        if_return: false,
        inline: false,
        join_vars: false,
        keep_infinity: true,
        loops: false,
        negate_iife: false,
        properties: false,
        reduce_funcs: false,
        reduce_vars: false,
        sequences: false,
        side_effects: false,
        switches: false,
        top_retain: false,
        toplevel: false,
        typeofs: false,
        unused: false,

        // Switch off all types of compression except those needed to convince
        // react-devtools that we're using a production build
        conditionals: true,
        dead_code: true,
        evaluate: true,
      },
      mangle: true,
    },
  });

  return {
    // There's an interesting bug in webpack where passing *any* uglify plugin, where `minimize` is
    // false, causes webpack to use its own minimizer plugin + settings.
    minimizer: noMinimizeFlag ? undefined : [terserPlugin],
    minimize: noMinimizeFlag ? false : true,
    splitChunks: {
      // "Maximum number of parallel requests when on-demand loading. (default in production: 5)"
      // The default value of 5 causes the webpack process to crash, reason currently unknown
      maxAsyncRequests: Infinity,
      cacheGroups: {
        vendors: {
          name: 'vendors',
          enforce: true,
          chunks: 'all',
          test: (module /*: { context: string | null } */) => {
            if (!module.context) {
              return false;
            }
            return /node_modules\/(react|react-dom|styled-components|prop-types|@emotion|@babel\/runtime)($|\/)/.test(
              module.context,
            );
          },
          priority: 1,
        },
      },
    },
  };
}
