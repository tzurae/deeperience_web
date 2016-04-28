var chai = require('chai');
var request = require('superagent');
var expect = chai.expect;
var constants = require('./constants');

describe('#Pages', function() {
  describe('GET /', function() {
    it('should respond a page', function(done) {
      request
        .get(constants.BASE + '/')
        .end(function(err, res) {
          expect(err).to.equal(null);
          expect(res).to.not.be.undefined;
          expect(res.status).to.equal(200);
          done();
        });
    });
  });
});