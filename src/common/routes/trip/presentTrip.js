export default (store) => ({
  path: 'presentTrip',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../container/trip/PresentTrip/index').default)
    })
  },
  onEnter: require('../../utils/authRequired').default(store),
})
