export default (store) => ({
  path: 'todo',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./todo/ListPage').default)
    })
  },
})
