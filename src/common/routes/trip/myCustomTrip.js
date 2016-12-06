export default (store) => ({
  path: 'myCustomTrip',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../container/trip/MyCustomTripPage/').default)
    })
  },
  // onEnter: require('../../utils/authRequired').default(store),
})
