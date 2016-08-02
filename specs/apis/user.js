var chai = require('chai');
var request = require('superagent');
var expect = chai.expect;
var constants = require('../constants');
var User = require('../../build/server/models/User').default;
var features = require('../features');

describe('#user', function() {
  var fakeUser;
  var resUser;

  var validateUser = function(user) {
    expect(user).to.contain.all.keys(['_id', 'email']);
    expect(user).to.not.have.any.keys(['password']);
  };

  before(function(done) {
    User.remove({}, done);
  });

  describe('#Unauthorized User', function() {
    // POST /api/user
    describe('POST /api/user', function() {
      fakeUser = {
        name: features.user[0].name,
        email: features.user[0].email.value,
        password: features.user[0].password,
      };
      it('should create user', function(done) {
        request
          .post(constants.BASE + '/api/user')
          .send(fakeUser)
          .end(function(err, res) {
            expect(res).to.not.be.undefined;
            expect(res.status).to.equal(200);
            expect(res.body.isError).to.be.false;
            validateUser(res.body.user);
            resUser = res.body.user;
            done();
          });
      });
      it('should fail when email is duplicate', function(done) {
        request
          .post(constants.BASE + '/api/user')
          .send(fakeUser)
          .end(function(err, res) {
            expect(res).to.not.be.undefined;
            expect(res.status).to.equal(200);
            expect(res.body.isError).to.be.true;
            done();
          });
      });
    });

    // POST /api/user/login
    describe('POST /api/user/login', function() {
      it('should auth valid user', function(done) {
        fakeUser = {
          email: features.user[0].email.value,
          password: features.user[0].password,
        };
        request
          .post(constants.BASE + '/api/user/login')
          .send(fakeUser)
          .end(function(err, res) {
            expect(res).to.not.be.undefined;
            expect(res.status).to.equal(200);
            expect(res.body.isError).to.be.false;
            expect(res.body.isAuth).to.be.true;
            expect(res.body.token).to.be.a('string');
            done();
          });
      });
      it('should reject invalid user', function(done) {
        request
          .post(constants.BASE + '/api/user/login')
          .send({})
          .end(function(err, res) {
            expect(res).to.not.be.undefined;
            expect(res.status).to.equal(200);
            expect(res.body.isError).to.be.false;
            expect(res.body.isAuth).to.be.false;
            done();
          });
      });
    });

    // GET /api/user/logout
    describe('GET /api/user/logout', function() {
      it('should unauth user', function(done) {
        request
          .get(constants.BASE + '/api/user/logout')
          .end(function(err, res) {
            expect(res).to.not.be.undefined;
            expect(res.status).to.equal(200);
            expect(res.body.isError).to.be.false;
            done();
          });
      });
    });

    // GET /api/user/me
    describe('GET /api/user/me', function() {
      it('should be rejected', function(done) {
        request
          .get(constants.BASE + '/api/user/me')
          .end(function(err, res) {
            expect(res).to.not.be.undefined;
            expect(res.status).to.equal(200);
            expect(res.body.status).to.equal(401);
            done();
          });
      });
    });
  });

  describe('#Authorized User', function() {
    // GET /api/user/me
    describe('GET /api/user/me', function() {
      it('should show user', function(done) {
        User.findOne({}, (err, user) => {
          var token = user.toJwtToken();
          request
            .get(constants.BASE + '/api/user/me')
            .set('Cookie', 'token=' + token)
            .end(function(err, res) {
              expect(res).to.not.be.undefined;
              expect(res.status).to.equal(200);
              expect(res.body.isError).to.be.false;
              validateUser(res.body.user);
              done();
            });
        });
      });
    });
  });

  after(function(done) {
    User.remove({}, done);
  });
});
