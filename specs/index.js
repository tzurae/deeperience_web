process.env.NODE_ENV = 'test';
var constants = require('./constants');
var appPromise = require('../build/server/app').default;
var server;

before(function(done) {
  appPromise.then(function(app) {
    console.log('starting server on port', constants.PORT, '...');
    server = app.listen(constants.PORT, done);
  });
});

require('./pages');
require('./apis');

after(function(done) {
  console.log('closing server...');
  server.close();
  done();
});