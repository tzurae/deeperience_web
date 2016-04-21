import appPromise from './app';

appPromise
  .then((app) => {
    // launch server
    const port = process.env.PORT || process.argv[2] || 3000;
    app.listen(port, (err) => {
      if (err) {
        throw err;
      }
      console.log('Listening at port', port);
    });
  });