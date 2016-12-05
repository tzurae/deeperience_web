export default (store) => ({
  path: 'me',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../container/user/ShowPage').default)
    })
  },
  onEnter: require('../../utils/authRequired').default(store),
})
