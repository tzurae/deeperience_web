import mongoose from 'mongoose';
import credentials from '../../config/credentials';
import app from './app';

// connect to mongolab
mongoose.connect(credentials.mongoDbUri, (err) => {
  if (err) {
    throw err;
  }
  // launch server
  const port = process.env.PORT || process.argv[2] || 3000;
  app.listen(port, (err) => {
    if (err) {
      throw err;
    }
    console.log('Listening at port', port);
  });
});