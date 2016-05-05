import env from '../utils/env';
import path from 'path';
import express from 'express';
import favicon from 'serve-favicon';
import bodyParser from 'body-parser';
import reactCookie from 'react-cookie';
import morgan from './morgan';
import passport from './passport';
import mountHelper from './mountHelper';

export default ({ app }) => {
  // inject livereload feature
  if (env === 'development') {
    console.log('using livereload');
    const webpack = require('webpack');
    const config = require('../../../config/webpack.config.dev');
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

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));

  // parse application/json
  app.use(bodyParser.json());

  // cookie parser
  app.use((req, res, next) => {
    reactCookie.setRawCookie(req.headers.cookie);
    next();
  });

  // setup passport
  app.use(passport);

  // mount helper functions
  app.use(mountHelper);
};