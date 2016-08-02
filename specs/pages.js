var chai = require('chai');
var request = require('superagent');
var expect = chai.expect;
var constants = require('./constants');
var User = require('../build/server/models/User').default;
var features = require('./features');

describe('#Pages', function() {
  var userTokens = [''];
  var publicPages = [
    '/',
    '/user/register',
    '/user/login',
  ];
  var privatePages = [
    '/user/me',
  ];

  before(function(done) {
    User(features.user[0]).save(function(err, user) {
      if (err) {
        return done(err);
      }
      userTokens[0] = user.toJwtToken();
      done();
    });
  });

  describe('#Unauthorized User', function() {
    publicPages.forEach(function iteratee(page) {
      describe('GET ' + page, function() {
        it('should access a public page', function(cb) {
          request
            .get(constants.BASE + page)
            .end(function(err, res) {
              expect(err).to.equal(null);
              expect(res).to.not.be.undefined;
              expect(res.status).to.equal(200);
              cb();
            });
        });
      });
    });

    privatePages.forEach(function iteratee(page) {
      describe('GET ' + page, function() {
        it('should redirect from a private page to login page', function(cb) {
          request
            .get(constants.BASE + page)
            .end(function(err, res) {
              expect(err).to.equal(null);
              expect(res).to.not.be.undefined;
              expect(res.status).to.equal(200);
              expect(res.redirects).to.have.length.above(0);
              expect(res.redirects[0]).to.have.string('/user/login');
              cb();
            });
        });
      });
    });
  });

  describe('#Authorized User', function() {
    (publicPages.concat(privatePages)).forEach(function iteratee(page) {
      describe('GET ' + page, function() {
        it('should access both public and private pages', function(cb) {
          request
            .get(constants.BASE + page)
            .set('Cookie', 'token=' + userTokens[0])
            .end(function(err, res) {
              expect(err).to.equal(null);
              expect(res).to.not.be.undefined;
              expect(res.status).to.equal(200);
              cb();
            });
        });
      });
    });
  });

  after(function(done) {
    User.remove({ 'email.value': features.user[0].email.value }, function(err) {
      done(err);
    });
  });
});
