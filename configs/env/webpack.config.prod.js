require("babel-polyfill")
var webpack = require('webpack');
var path = require('path');
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsConfig = require('../project/webpack-isomorphic-tools-configuration');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var postcssConfig = require('./postcss.config');
var babelConfig = require('./babel.config.prod');

var webpackIsomorphicToolsPlugin =
  new WebpackIsomorphicToolsPlugin(webpackIsomorphicToolsConfig);

module.exports = {
  // project root, sync with `./webpack.config.dev.js` and `src/webpackIsomorphicToolsInjector.js`
  context: path.resolve(__dirname, '../../src'),
  // devtool: 'source-map',
  entry: [
    'babel-polyfill',
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
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        BROWSER: JSON.stringify(true),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        dead_code: true,
      },
      compressor: {
        warnings: false,
      },
    }),
    new ExtractTextPlugin('[name]-[chunkhash].css', {
      allChunks: true,
    }),
    webpackIsomorphicToolsPlugin,
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      include: path.join(__dirname, '../../src'),
      loader: 'babel',
      query: babelConfig,
    }, {
      test: webpackIsomorphicToolsPlugin.regular_expression('cssModules'),
      loader: ExtractTextPlugin.extract(
        'style-loader',
        ['css-loader?modules&localIdentName=[local]_[hash:base64:3]&camelCase',
        'postcss-loader',
        'sass-loader']
      )
      // loader: ExtractTextPlugin.extract(
      //   'style',
      //   'css?modules&localIdentName=[local]_[hash:base64:3]&camelCase!postcss!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true'
      // ),
    }, {
      test: webpackIsomorphicToolsPlugin.regular_expression('images'),
      loader: 'url-loader?limit=10240',
    }],
  },
  postcss: function() {
    return postcssConfig;
  }
};
