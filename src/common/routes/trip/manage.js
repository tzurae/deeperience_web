export default (store) => ({
  path: 'manage',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../container/trip/CreateSitePage/').default)
    })
  },
  onEnter: require('../../utils/authRequired').default(store),
})
