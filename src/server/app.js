process.env.NODE_ENV = process.env.NODE_ENV || 'production';

import express from 'express';
// import mongoose from 'mongoose';
// import mongolab from './credentials/mongolab';
import middlewares from './middlewares';
import routes from './routes';

const app = express();
app.set('env', process.env.NODE_ENV);
if (app.get('env') === 'development') {
  require('source-map-support').install();
}
middlewares({ app });
routes({ app });

export default app;