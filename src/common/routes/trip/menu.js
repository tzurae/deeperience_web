export default (store) => ({
  path: 'menu',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../container/trip/TripMenuPage').default)
    })
  },
  onEnter: require('../../utils/authRequired').default(store),
})
