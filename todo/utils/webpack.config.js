const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'uidu-utils.js',
    library: 'uiduUtils',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.css'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
    new UglifyJsPlugin({ sourceMap: true }),
    new CompressionPlugin(),
  ],
  externals: [
    'react',
    'react-dom',
    'prop-types',
    'moment',
    'autolinker',
    'query-string',
    'd3-collection',
    'whatwg-fetch',
    'styled-components',
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
};
