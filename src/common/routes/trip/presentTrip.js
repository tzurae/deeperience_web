export default (store) => ({
  path: 'presentTrip',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../components/pages/trip/PresentTrip/index').default)
    })
  },
  onEnter: require('../../utils/authRequired').default(store),
})
