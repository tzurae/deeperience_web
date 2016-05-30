export default (store) => ({
  path: 'user',
  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./register').default(store),
        require('./login').default(store),
        require('./logout').default(store),
        require('./me').default(store),
      ]);
    });
  },
});
