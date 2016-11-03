export default (store) => ({
  path: 'todo',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../components/pages/todo/ListPage').default);
    });
  },
});
