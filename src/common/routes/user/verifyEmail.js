export default (store) => ({
  path: 'email/verify',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../container/user/VerifyEmailPage').default)
    })
  },
})
