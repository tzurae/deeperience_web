export default (store) => ({
  path: 'trip',
  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./createSite').default(store),
        require('./createTrip').default(store),
        require('./presentTrip').default(store),
        require('./myCustomTrip').default(store),
      ])
    })
  },
})
