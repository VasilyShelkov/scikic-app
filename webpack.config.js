const path = require('path');
const webpack = require('webpack');

const development = process.env.NODE_ENV === 'development';

module.exports = {
  devtool: 'eval',
  entry: development ? [
    'eventsource-polyfill', // necessary evil for hot loading with IE
    'webpack-hot-middleware/client',
    './src/index.js'
  ] :
  './src/index.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/',
  },
  plugins: development ? [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
          // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
        screw_ie8: true,

          // jscs:enable requireCamelCaseOrUpperCaseIdentifiers
        warnings: false,
      },
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: path.join(__dirname, 'src'),
      }
    ],
  },
};
