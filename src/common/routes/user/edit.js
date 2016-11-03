export default (store) => ({
  path: 'me/edit',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../components/pages/user/EditPage').default);
    });
  },
});
