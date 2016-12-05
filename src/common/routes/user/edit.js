export default (store) => ({
  path: 'me/edit',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../container/user/EditPage').default)
    })
  },
  onEnter: require('../../utils/authRequired').default(store),
})
