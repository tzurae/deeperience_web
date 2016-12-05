export default (store) => ({
  path: 'user',
  getIndexRoute(location, cb) {
    require.ensure([], (require) => {
      cb(null, {
        component:
          require('../../../container/admin/user/ListPage').default,
      })
    })
  },
})
