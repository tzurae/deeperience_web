export default (store) => ({
  path: 'trip',
  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./createTrip').default(store),
      ])
    })
  },
})
