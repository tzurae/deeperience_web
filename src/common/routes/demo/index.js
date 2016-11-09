export default (store) => ({
  path: 'demo',
  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./formElement').default(store),
      ]);
    });
  },
});
