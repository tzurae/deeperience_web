process.env.NODE_ENV = process.env.NODE_ENV || 'production';

import express from 'express';
import mongoose from 'mongoose';
import credentials from '../../config/credentials';
import middlewares from './middlewares';
import routes from './routes';

const appPromise = new Promise((resolve, reject) => {
  const app = express();
  app.set('env', process.env.NODE_ENV);
  // connect to mongolab
  mongoose.connect(credentials.mongoDbUri, (err) => {
    if (err) {
      throw err;
    }
    middlewares({ app });
    routes({ app });
    resolve(app);
  });
});

export default appPromise;