import env from './utils/env';
import express from 'express';
import mongoose from 'mongoose';
import credentials from '../../config/credentials';
import middlewares from './middlewares';
import routes from './routes';

const appPromise = new Promise((resolve, reject) => {
  const app = express();
  app.set('env', env);
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
