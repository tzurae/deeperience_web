import env from '../utils/env';
import path from 'path';
import express from 'express';
import favicon from 'serve-favicon';
import morgan from './morgan';
import passport from './passport';
import mountStore from './mountStore';
import initCookie from './initCookie';

export default ({ app }) => {
  // inject livereload feature
  if (env === 'development') {
    console.log('using livereload');
    const webpack = require('webpack');
    const config = require('../../../configs/webpack.config.dev');
    const compiler = webpack(config);

    app.use(require('webpack-dev-middleware')(compiler, {
      noInfo: true,
      publicPath: config.output.publicPath,
    }));

    app.use(require('webpack-hot-middleware')(compiler));
  }

  // favicon
  app.use(favicon(path.join(__dirname, '../../public/img/favicon.ico')));

  // log request
  app.use(morgan);

  // static files
  app.use(express.static(
    path.join(__dirname, '../../public')));

  // mount redux store
  app.use(mountStore);

  // initialize cookie
  app.use(initCookie);

  // setup passport
  app.use(passport);
};
