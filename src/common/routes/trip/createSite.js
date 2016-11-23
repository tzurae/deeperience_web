export default (store) => ({
  path: 'createSite',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../components/pages/trip/CreateSitePage').default)
    })
  },
  onEnter: require('../../utils/authRequired').default(store),
})