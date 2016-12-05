export default (store) => ({
  path: 'logout',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../container/user/LogoutPage').default)
    })
  },
})
