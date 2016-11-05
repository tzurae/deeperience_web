import chai from 'chai';
import { clearUsers, prepareUsers } from '../utils';
import request from 'superagent';
import constants from '../constants';
let expect = chai.expect;

describe('#Pages', () => {
  let reqs = {
    users: [],
    admins: [],
  };
  let userInstances = {
    users: [],
    admins: [],
  };
  let pages = {
    public: [
      '/',
      '/user/register',
      '/user/login',
      '/user/email/verify',
      '/user/password/forget',
      '/user/password/reset',
    ],
    normalUserRequired: [
      '/user/me',
      '/user/me/edit',
    ],
    adminUserRequired: [
      '/admin/user',
    ],
  };

  before((done) => {
    clearUsers(() => prepareUsers(reqs, userInstances, done));
  });

  describe('#Unauth User', () => {
    pages.public.forEach((page) => {
      describe(`GET ${page}`, () => {
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

    pages.normalUserRequired.forEach((page) => {
      describe(`GET ${page}`, () => {
        it('should be redirected to login page', (cb) => {
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

  describe('#Normal User', () => {
    (pages.public.concat(pages.normalUserRequired)).forEach((page) => {
      describe(`GET ${page}`, () => {
        it('should access both public and normal-user-only pages', (cb) => {
          request
            .get(constants.BASE + page)
            .set('Cookie', reqs.users[0].get('cookie'))
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

  describe('#Admin User', () => {
    (pages.public.concat(pages.adminUserRequired)).forEach((page) => {
      describe(`GET ${page}`, () => {
        it('should access both public and admin-only pages', (cb) => {
          request
            .get(constants.BASE + page)
            .set('Cookie', reqs.users[0].get('cookie'))
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
    clearUsers(done);
  });
});
