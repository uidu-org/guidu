const os = require('os');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CircularDependencyPlugin = require('circular-dependency-plugin');

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
        // https://github.com/react-dnd/react-dnd/issues/3425
        {
          test: /\.m?js$/,
          resolve: {
            fullySpecified: false,
          },
        },
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
          exclude:
            /node_modules|packages\/media\/media-editor\/src\/engine\/core\/binaries\/mediaEditor.js/,
          use: [
            // {
            //   loader: 'thread-loader',
            //   options: {
            //     name: 'babel-pool',
            //   },
            // },
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
        {
          test: /\.(ts|tsx)?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'cache-loader',
              options: {
                cacheDirectory: path.resolve(baseCacheDir, 'ts'),
              },
            },
            {
              loader: require.resolve('babel-loader'),
              options: {
                configFile: '../babel.config.js',
                rootMode: 'upward',
                envName: 'production:esm',
                cacheDirectory: path.resolve(baseCacheDir, 'babel'),
              },
            },
          ],
        },
        {
          test: /\.((c|sa|sc)ss)$/i,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                // Run `postcss-loader` on each CSS `@import`, do not forget that `sass-loader` compile non CSS `@import`'s into a single file
                // If you need run `sass-loader` and `postcss-loader` on each CSS `@import` please set it to `2`
                importLoaders: 2,
                // Automatically enable css modules for files satisfying `/\.module\.\w+$/i` RegExp.
                modules: { auto: true },
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    require('postcss-flexbugs-fixes'),
                    require('postcss-preset-env'),
                  ],
                },
              },
            },
            {
              loader: 'sass-loader',
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
      ],
    },
    resolve: {
      mainFields: ['uidu:src', 'browser', 'module', 'main'],
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss', 'module.scss'],
      fallback: {
        path: false,
        assert: false,
        // 'process/browser': require.resolve('process/browser')
      },
      ...(webpackOptions ? webpackOptions.resolve : {}),
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
      WEBSITE_ENV: JSON.stringify(websiteEnv),
      BASE_TITLE: JSON.stringify(
        `GUIdu by uidu ${!isProduction ? '- DEV' : ''}`,
      ),
      DEFAULT_META_DESCRIPTION: JSON.stringify(
        `GUIdu is the official component library for uidu's Design System.`,
      ),
      // process: 'process/browser',
    }),

    new webpack.ProvidePlugin({
      process: 'process/browser',
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

    // new CircularDependencyPlugin({
    //   // exclude detection of files based on a RegExp
    //   exclude: /node_modules/,
    //   // add errors to webpack instead of warnings
    //   failOnError: false,
    //   // allow import cycles that include an asyncronous import,
    //   // e.g. via import(/* webpackMode: "weak" */ './file.js')
    //   allowAsyncCycles: false,
    //   // set the current working directory for displaying module paths
    //   cwd: process.cwd(),
    // }),
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
        defaultVendors: {
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
