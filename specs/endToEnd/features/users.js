import Roles from '../../../build/common/constants/Roles';

export default {
  users: [{
    name: 'test1',
    email: {
      value: 'fakeUser1@gmail.com',
    },
    password: 'fake',
    role: Roles.USER,
  }, {
    name: 'test2',
    email: {
      value: 'fakeUser2@gmail.com',
    },
    password: 'fake123',
    role: Roles.USER,
  }],
  admins: [{
    name: 'admin',
    email: {
      value: 'admin@gmail.com',
    },
    password: 'admin',
    role: Roles.ADMIN,
  }],
};
