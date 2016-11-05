import env from './utils/env';
// just import the injector and don't use it as normal promise
// otherwise you will go into a deadlock
// (webpackIsomorphicTools is waiting for server's webpack-dev-middleware to compiler,
// and the server is waiting for webpackIsomorphicTools' after-compilation-callback)
import './webpackIsomorphicToolsInjector';
import express from 'express';
import mongoose from 'mongoose';
import configs from '../../configs/project/server';
import clientConfigs from '../../configs/project/client';
import middlewares from './middlewares';
import routes from './routes';

const appPromise = new Promise((resolve, reject) => {
  const app = express();
  app.set('env', env);

  // error handler for the whole app process
  process.on('uncaughtException', (err) => {
    console.log('uncaughtException', err);
    process.exit(1);
  });

  process.on('unhandledRejection', (reason, p) => {
    throw reason;
  });

  // initialize firebase
  if (configs.firebase && clientConfigs.firebase) {
    let firebase = require('firebase');
    firebase.initializeApp({
      serviceAccount: configs.firebase,
      databaseURL: clientConfigs.firebase.databaseURL,
    });
    if (env !== 'test') {
      console.log('[Service] [Firebase]\tenabled');
    }
  } else {
    if (env !== 'test') {
      console.log('[Service] [Firebase]\tdisabled');
    }
  }

  // connect to mongolab
  if (configs.mongo) {
    mongoose.connect(configs.mongo[env], (err) => {
      if (err) {
        throw err;
      }
      if (env !== 'test') {
        console.log('[Service] [Mongo]\tenabled');
      }
      middlewares({ app });
      routes({ app });
      // error handler for the current request
      app.use((err, req, res, next) => {
        console.error(err.stack);
        if (env !== 'production') {
          res.status(500).send(`<pre>${err.stack}</pre>`);
        } else {
          res.status(500).send('Service Unavailable');
        }
      });
      return resolve(app);
    });
  } else {
    if (env !== 'test') {
      console.log('[Service] [Mongo]\tdisabled');
    }
    return reject(new Error('MongoDB URI is required'));
  }
});

export default appPromise;
