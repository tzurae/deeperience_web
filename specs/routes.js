process.env.NODE_ENV = 'test';

var chai = require('chai');
var request = require('superagent');
var expect = chai.expect;
var appPromise = require('../build/server/app').default;
var User = require('../build/server/models/User').default;

var PORT = 5566;
var BASE = 'http://localhost:' + PORT;
var server;
var fakeUser = {
  email: 'fakeuser@gmail.com',
  password: 'fake',
};
var resUser;

before(function(done) {
  appPromise.then((app) => {
    server = app.listen(PORT, done);
  });
});

describe('#Pages', function() {
  describe('GET /', function() {
    it('should respond a page', function(done) {
      request
        .get(BASE + '/')
        .end(function(err, res) {
          expect(err).to.equal(null);
          expect(res).to.not.be.undefined;
          expect(res.status).to.equal(200);
          done();
        });
    });
  });
});

describe('#APIs', function() {
  var validateUser = function(user) {
    expect(user).to.contain.all.keys(['_id', 'email']);
    expect(user).to.not.have.any.keys(['password']);
  };
  describe('#Unauthorized', function() {
    // POST /api/user
    describe('POST /api/user', function() {
      it('should create user', function(done) {
        request
          .post(BASE + '/api/user')
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
    });

    // POST /api/user/login
    describe('POST /api/user/login', function() {
      it('should auth valid user', function(done) {
        request
          .post(BASE + '/api/user/login')
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
          .post(BASE + '/api/user/login')
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
          .get(BASE + '/api/user/logout')
          .end(function(err, res) {
            expect(res).to.not.be.undefined;
            expect(res.status).to.equal(200);
            expect(res.body.isError).to.be.false;
            done();
          });
      });
      it('should reject invalid user', function(done) {
        request
          .post(BASE + '/api/user/login')
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

    // GET /api/user/me
    describe('GET /api/user/me', function() {
      it('should be rejected', function(done) {
        request
          .get(BASE + '/api/user/me')
          .end(function(err, res) {
            expect(res).to.not.be.undefined;
            expect(res.status).to.equal(401);
            done();
          });
      });
    });
  });

  describe('#Authorized', function() {
    // GET /api/user/me
    describe('GET /api/user/me', function() {
      it('should show user', function(done) {
        User.findOne({}, (err, user) => {
          var token = user.toJwtToken();
          request
            .get(BASE + '/api/user/me')
            .set('Authorization', 'JWT ' + token)
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
});

after(function(done) {
  var removeFakeUser = new Promise((resolve, reject) => {
    if (resUser._id) {
      User.remove({
        _id: resUser._id,
      }, resolve);
    } else {
      resolve();
    }
  });
  removeFakeUser
    .then(() => {
      server.close();
      done();
    })
    .catch((err) => {
      throw err;
    });
});