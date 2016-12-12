export default (store) => ({
  path: 'order',
  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./list').default(store),
        require('./phase').default(store),
      ])
    })
  },
})
