export default (store) => ({
  path: 'login',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../container/user/LoginPage').default)
    })
  },
})
