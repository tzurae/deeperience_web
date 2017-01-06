var path = require('path');
var webpack = require('webpack');
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsConfig = require('../project/webpack-isomorphic-tools-configuration');
var babelConfig = require('./babel.config.dev.client');
var postcssConfig = require('./postcss.config');
var babelpolyfill = require('babel-polyfill'); // for generator function usage

var webpackIsomorphicToolsPlugin =
  new WebpackIsomorphicToolsPlugin(webpackIsomorphicToolsConfig)
    .development();

module.exports = {
  // project root, sync with `./webpack.config.prod.js` and `src/webpackIsomorphicToolsInjector.js`
  context: path.resolve(__dirname, '../../src'),
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'babel-polyfill',
    'eventsource-polyfill',
    'webpack-hot-middleware/client',
    path.join(__dirname, '../../src/client/index'),
  ],
  output: {
    path: path.join(__dirname, '../../build/public/js'),
    filename: 'bundle.js',
    chunkFilename: '[id].chunk.js',
    publicPath: '/js/',
  },
  externals: {
    jquery: 'jQuery',
    mongoose: 'mongoose',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        BROWSER: JSON.stringify(true),
      },
    }),
    new webpack.NoErrorsPlugin(),
    webpackIsomorphicToolsPlugin,
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      include: path.join(__dirname, '../../src'),
      loader: 'babel',
      query: babelConfig,
    },
      {
      test: webpackIsomorphicToolsPlugin.regular_expression('cssModules'),
      loaders: [
        'style-loader',
        'css-loader?modules&localIdentName=[local]_[hash:base64:3]&camelCase',
        'postcss-loader',
        'sass-loader',
      ],
    },
      {
      test: webpackIsomorphicToolsPlugin.regular_expression('images'),
      loader: 'url-loader?limit=10240&name=[sha512:hash:base64:7]',
    }],
  },
  postcss: function() {
    return postcssConfig;
  }
};
