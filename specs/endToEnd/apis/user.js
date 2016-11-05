import chai from 'chai';
import { apiEngine, clearUsers, prepareUsers } from '../../utils';
import ApiEngine from '../../../build/common/utils/ApiEngine';
import userAPI from '../../../build/common/api/user';
import features from '../features';
import Errors from '../../../build/common/constants/Errors';
let expect = chai.expect;

describe('#userAPI', () => {
  let reqs = {
    users: [],
    admins: [],
  };
  let fakeUser;
  let validateUser = (user) => {
    expect(user).to.contain.all.keys(['_id', 'email']);
    expect(user).to.not.have.any.keys(['password']);
  };

  before((done) => {
    clearUsers(() => prepareUsers(reqs, done));
  });

  describe('#list()', () => {
    it('[unauth user] should be rejected', (done) => {
      userAPI(apiEngine)
        .list({ page: 1 })
        .catch((err) => {
          expect(err).to.have.lengthOf(1);
          expect(err[0].code)
            .to.equal(Errors.USER_UNAUTHORIZED.code);
          done();
        });
    });
    it('[normal user] should be rejected', (done) => {
      userAPI(new ApiEngine(reqs.users[0]))
        .list({ page: 1 })
        .catch((err) => {
          expect(err).to.have.lengthOf(1);
          expect(err[0].code)
            .to.equal(Errors.PERMISSION_DENIED.code);
          done();
        });
    });
    it('[admin user] should list all users', (done) => {
      userAPI(new ApiEngine(reqs.admins[0]))
        .list({ page: 1 })
        .then((json) => {
          expect(json).contain.all.keys(['users', 'page']);
          done();
        });
    });
  });

  describe('#register()', () => {
    fakeUser = {
      name: features.users.users[0].name,
      email: features.users.users[0].email.value,
      password: features.users.users[0].password,
    };
    before((done) => {
      clearUsers(done);
    });
    it('should create user', (done) => {
      userAPI(apiEngine)
        .register(fakeUser)
        .then((json) => {
          validateUser(json.user);
          done();
        });
    });
    it('should fail when email is duplicate', (done) => {
      userAPI(apiEngine)
        .register(fakeUser)
        .catch((err) => {
          expect(err[0].code)
            .to.equal(Errors.USER_EXISTED.code);
          done();
        });
    });
    after((done) => {
      clearUsers(() => prepareUsers(reqs, done));
    });
  });

  describe('#login()', () => {
    it('should auth valid user', (done) => {
      fakeUser = {
        email: features.users.users[0].email.value,
        password: features.users.users[0].password,
      };
      userAPI(apiEngine)
        .login(fakeUser)
        .then((json) => {
          expect(json.isAuth).to.be.true;
          expect(json.token).to.be.a('string');
          done();
        });
    });
    it('should reject invalid user', (done) => {
      userAPI(apiEngine)
        .login({})
        .then((json) => {
          expect(json.isAuth).to.be.false;
          done();
        });
    });
  });

  describe('#logout()', () => {
    it('should logout user', (done) => {
      userAPI(apiEngine)
        .logout({})
        .then((json) => {
          expect(json).to.be.empty;
          done();
        });
    });
  });

  describe('#read()', () => {
    before((done) => {
      clearUsers(() => prepareUsers(reqs, done));
    });
    it('[unauth user] should be rejected', (done) => {
      userAPI(apiEngine)
        .read()
        .catch((err) => {
          expect(err).to.have.lengthOf(1);
          expect(err[0].code)
            .to.equal(Errors.USER_UNAUTHORIZED.code);
          done();
        });
    });
    it('[normal user] should show user detail', (done) => {
      userAPI(new ApiEngine(reqs.users[0]))
        .read()
        .then((json) => {
          validateUser(json.user);
          done();
        });
    });
  });

  describe('#update()', () => {
    it('[auth user] should update user detail', (done) => {
      let newName = 'foobar';
      userAPI(new ApiEngine(reqs.users[0]))
        .update({
          name: newName,
        })
        .then((json) => {
          expect(json.user.name).to.equal(newName);
          done();
        });
    });
  });

  after((done) => {
    clearUsers(done);
  });
});
