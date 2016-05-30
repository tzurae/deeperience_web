export default (store) => ({
  path: '*',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../components/pages/NotFoundPage').default);
    });
  },
});
