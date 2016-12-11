export default (store) => ({
  path: 'list',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../container/custom/MyCustomTripPage').default)
    })
  },
  onEnter: require('../../utils/authRequired').default(store),
})
