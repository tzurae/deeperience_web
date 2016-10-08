import chai from 'chai';
import request from 'superagent';
import constants from '../constants';
import User from '../../build/server/models/User';
import features from './features';
let expect = chai.expect;

describe('#Pages', () => {
  let userTokens = [''];
  let publicPages = [
    '/',
    '/user/register',
    '/user/login',
  ];
  let privatePages = [
    '/user/me',
  ];

  before((done) => {
    User(features.user[0]).save((err, user) => {
      if (err) {
        return done(err);
      }
      userTokens[0] = user.toJwtToken();
      done();
    });
  });

  describe('#Unauthorized User', () => {
    publicPages.forEach((page) => {
      describe('GET ' + page, () => {
        it('should access a public page', (cb) => {
          request
            .get(constants.BASE + page)
            .end((err, res) => {
              expect(err).to.equal(null);
              expect(res).to.not.be.undefined;
              expect(res.status).to.equal(200);
              cb();
            });
        });
      });
    });

    privatePages.forEach((page) => {
      describe('GET ' + page, () => {
        it('should redirect from a private page to login page', (cb) => {
          request
            .get(constants.BASE + page)
            .end((err, res) => {
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

  describe('#Authorized User', () => {
    (publicPages.concat(privatePages)).forEach((page) => {
      describe('GET ' + page, () => {
        it('should access both public and private pages', (cb) => {
          request
            .get(constants.BASE + page)
            .set('Cookie', 'token=' + userTokens[0])
            .end((err, res) => {
              expect(err).to.equal(null);
              expect(res).to.not.be.undefined;
              expect(res.status).to.equal(200);
              cb();
            });
        });
      });
    });
  });

  after((done) => {
    User.remove({ 'email.value': features.user[0].email.value }, (err) => {
      done(err);
    });
  });
});
