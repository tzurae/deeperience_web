import chai from 'chai';
import request from 'superagent';
import constants from '../../constants';
import User from '../../../build/server/models/User';
import features from '../features';
import Errors from '../../../build/common/constants/Errors';
let expect = chai.expect;

describe('#user', () => {
  let fakeUser;
  let resUser;

  let validateUser = (user) => {
    expect(user).to.contain.all.keys(['_id', 'email']);
    expect(user).to.not.have.any.keys(['password']);
  };

  before((done) => {
    User.remove({}, done);
  });

  describe('#Unauthorized User', () => {
    // POST /api/user
    describe('POST /api/users', () => {
      fakeUser = {
        name: features.user[0].name,
        email: features.user[0].email.value,
        password: features.user[0].password,
      };
      it('should create user', (done) => {
        request
          .post(constants.BASE + '/api/users')
          .send(fakeUser)
          .end((err, res) => {
            expect(err).to.equal(null);
            expect(res).to.not.be.undefined;
            expect(res.status).to.equal(200);
            expect(res.body.errors).to.be.undefined;
            validateUser(res.body.user);
            resUser = res.body.user;
            done();
          });
      });
      it('should fail when email is duplicate', (done) => {
        request
          .post(constants.BASE + '/api/users')
          .send(fakeUser)
          .end((err, res) => {
            expect(err).to.equal(null);
            expect(res).to.not.be.undefined;
            expect(res.status).to.equal(200);
            expect(res.body.errors[0].code)
              .to.equal(Errors.USER_EXISTED.code);
            done();
          });
      });
    });

    // POST /api/user/login
    describe('POST /api/users/login', () => {
      it('should auth valid user', (done) => {
        fakeUser = {
          email: features.user[0].email.value,
          password: features.user[0].password,
        };
        request
          .post(constants.BASE + '/api/users/login')
          .send(fakeUser)
          .end((err, res) => {
            expect(err).to.equal(null);
            expect(res).to.not.be.undefined;
            expect(res.status).to.equal(200);
            expect(res.body.errors).to.be.undefined;
            expect(res.body.isAuth).to.be.true;
            expect(res.body.token).to.be.a('string');
            done();
          });
      });
      it('should reject invalid user', (done) => {
        request
          .post(constants.BASE + '/api/users/login')
          .send({})
          .end((err, res) => {
            expect(err).to.equal(null);
            expect(res).to.not.be.undefined;
            expect(res.status).to.equal(200);
            expect(res.body.errors).to.be.undefined;
            expect(res.body.isAuth).to.be.false;
            done();
          });
      });
    });

    // GET /api/user/logout
    describe('GET /api/user/logout', () => {
      it('should unauth user', (done) => {
        request
          .get(constants.BASE + '/api/users/logout')
          .end((err, res) => {
            expect(err).to.equal(null);
            expect(res).to.not.be.undefined;
            expect(res.status).to.equal(200);
            expect(res.body.errors).to.be.undefined;
            done();
          });
      });
    });

    // GET /api/user/me
    describe('GET /api/users/me', () => {
      it('should be rejected', (done) => {
        request
          .get(constants.BASE + '/api/users/me')
          .end((err, res) => {
            expect(err).to.equal(null);
            expect(res).to.not.be.undefined;
            expect(res.status).to.equal(200);
            expect(res.body.errors[0].code)
              .to.equal(Errors.USER_UNAUTHORIZED.code);
            done();
          });
      });
    });
  });

  describe('#Authorized User', () => {
    // GET /api/user/me
    describe('GET /api/users/me', () => {
      it('should show user', (done) => {
        User.findOne({}, (err, user) => {
          expect(err).to.equal(null);
          let token = user.toJwtToken();
          request
            .get(constants.BASE + '/api/users/me')
            .set('Cookie', 'token=' + token)
            .end((err, res) => {
              expect(err).to.equal(null);
              expect(res).to.not.be.undefined;
              expect(res.status).to.equal(200);
              expect(res.body.errors).to.be.undefined;
              validateUser(res.body.user);
              done();
            });
        });
      });
    });
  });

  after((done) => {
    User.remove({}, done);
  });
});
