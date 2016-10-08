import constants from '../constants';
import appPromise from '../../build/server/app';
let server;

before((done) => {
  appPromise.then((app) => {
    console.log('starting server on port', constants.PORT, '...');
    server = app.listen(constants.PORT, done);
  });
});

require('./pages');
require('./apis');

after((done) => {
  console.log('closing server...');
  if (server) {
    server.close();
  }
  done();
});
