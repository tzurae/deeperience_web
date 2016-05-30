export default (store) => ({
  path: 'login',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../components/pages/user/LoginPage').default);
    });
  },
});
