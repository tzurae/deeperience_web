export default (store) => ({
  path: 'user',
  getIndexRoute(location, cb) {
    require.ensure([], (require) => {
      cb(null, {
        component:
          require('../../../components/pages/admin/user/ListPage').default,
      });
    });
  },
});
