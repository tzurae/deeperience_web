
const setCreateTripPath = (store, path, component) => ({
  path,
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require(`../../components/pages/trip/CreateTrip/${component}`).default)
    })
  },
  onEnter: require('../../utils/authRequired').default(store),
})

export default (store) => ({
  path: 'createTrip',
  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        setCreateTripPath(store, '1', 'TripIntroPage'),
      ])
    })
  },
})
