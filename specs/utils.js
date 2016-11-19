import ApiEngine from '../build/common/utils/ApiEngine';
import User from '../build/server/models/User';
import features from './endToEnd/features';

export let serializeCookie = (cookieObject) => (
  Object
    .keys(cookieObject)
    .map((key) => `${key}=${cookieObject[key]}`)
    .join(';')
);

export let getReq = ({ cookie }) => ({
  get: (key) => {
    if (key === 'cookie') {
      return serializeCookie(cookie);
    }
  },
});

export let clearUsers = (cb) => {
  User.remove({}, cb);
};

export let prepareUsers = (reqs, userInstances, cb) => {
  reqs.users = [];
  reqs.admins = [];
  userInstances.users = [];
  userInstances.admins = [];

  User(features.users.users[0]).save((err, user) => {
    userInstances.users.push(user);
    User(features.users.admins[0]).save((err, user) => {
      userInstances.admins.push(user);

      userInstances.users.forEach((normalUser) => {
        reqs.users.push(getReq({ cookie: {
          token: normalUser.toAuthenticationToken(),
        }}));
      });
      userInstances.admins.forEach((adminUser) => {
        reqs.admins.push(getReq({ cookie: {
          token: adminUser.toAuthenticationToken(),
        }}));
      });
      cb(err);
    });
  });
};

export let apiEngine = new ApiEngine(getReq({
  cookie: {},
}));
