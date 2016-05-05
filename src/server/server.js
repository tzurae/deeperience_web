import appPromise from './app';
import getPort from './utils/getPort';

appPromise
  .then((app) => {
    // launch server
    const port = getPort();
    app.listen(port, (err) => {
      if (err) {
        throw err;
      }
      console.log('Listening at port', port);
    });
  });
