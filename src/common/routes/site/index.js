export default (store) => ({
  path: 'site',
  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./create').default(store),
        // require('./manage').default(store),
      ])
    })
  },
})
