export default (store) => ({
  path: 'user',
  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./register').default(store),
        require('./verifyEmail').default(store),
        require('./login').default(store),
        require('./edit').default(store),
        require('./forgetPassword').default(store),
        require('./resetPassword').default(store),
        require('./logout').default(store),
        require('./me').default(store),
      ]);
    });
  },
});
