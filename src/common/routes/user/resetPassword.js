export default (store) => ({
  path: 'password/reset',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(
        null,
        require('../../container/user/ResetPasswordPage').default
      )
    })
  },
})
