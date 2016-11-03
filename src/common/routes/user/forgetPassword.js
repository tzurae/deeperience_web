export default (store) => ({
  path: 'password/forget',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(
        null,
        require('../../components/pages/user/ForgetPasswordPage').default
      );
    });
  },
});
