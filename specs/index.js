require('babel-register')(require('../configs/env/babel.config.dev.server'));
var constants = require('./constants');
process.env.NODE_ENV = constants.NODE_ENV;
process.env.PORT = constants.PORT;

describe('#EndToEnd', function() {
  require('./endToEnd');
});
