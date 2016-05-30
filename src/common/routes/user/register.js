export default (store) => ({
  path: 'register',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../components/pages/user/RegisterPage').default);
    });
  },
});
