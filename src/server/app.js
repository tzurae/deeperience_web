import env from './utils/env';
import express from 'express';
import mongoose from 'mongoose';
import firebase from 'firebase';
import configs from '../../configs/project/server';
import middlewares from './middlewares';
import routes from './routes';

const appPromise = new Promise((resolve, reject) => {
  const app = express();
  app.set('env', env);

  // initialize firebase
  firebase.initializeApp({
    serviceAccount: configs.firebase,
    databaseURL: 'https://express-react-hmr-boilerplate.firebaseio.com/',
  });

  // connect to mongolab
  mongoose.connect(
    configs.mongo[env],
    (err) => {
      if (err) {
        throw err;
      }
      middlewares({ app });
      routes({ app });
      resolve(app);
    }
  );
});

export default appPromise;
