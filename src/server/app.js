import env from './utils/env';
import express from 'express';
import mongoose from 'mongoose';
import firebase from 'firebase';
import credentials from '../../config/credentials';
import middlewares from './middlewares';
import routes from './routes';

const appPromise = new Promise((resolve, reject) => {
  const app = express();
  app.set('env', env);

  // initialize firebase
  firebase.initializeApp({
    serviceAccount: require('../../config/firebase.json'),
    databaseURL: 'https://express-react-hmr-boilerplate.firebaseio.com/',
  });

  // connect to mongolab
  mongoose.connect(
    credentials.mongoDbUri[env],
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
