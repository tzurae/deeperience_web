export default (store) => ({
  path: 'createTrip',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../components/pages/trip/CreateTrip/TripIntroPage').default)
    })
  },
  onEnter: require('../../utils/authRequired').default(store),
})
