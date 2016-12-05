export default (store) => ({
  path: '*',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../container/NotFoundPage').default)
    })
  },
})
