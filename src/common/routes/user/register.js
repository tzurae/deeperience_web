export default (store) => ({
  path: 'register',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../container/user/RegisterPage/index').default)
    })
  },
})
