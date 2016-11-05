import constants from '../constants';
import appPromise from '../../build/server/app';
let server;

before((done) => {
  appPromise.then((app) => {
    console.log('\nstarting server on port', constants.PORT, '...\n');
    server = app.listen(constants.PORT, done);
  });
});

require('./pages');
require('./apis');

after((done) => {
  console.log('\nclosing server...\n');
  if (server) {
    server.close();
  }
  done();
});
