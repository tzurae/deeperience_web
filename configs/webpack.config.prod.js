var path = require('path');
var webpack = require('webpack');
var babelConfig = require('./babel.config.prod');

module.exports = {
  // devtool: 'source-map',
  entry: [
    path.join(__dirname, '../src/client/index'),
  ],
  output: {
    path: path.join(__dirname, '../build/public/js'),
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
      compressor: {
        warnings: false,
      },
    }),
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      include: path.join(__dirname, '../src'),
      loader: 'babel',
      query: babelConfig,
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader',
    },],
  },
};
