export default (store) => ({
  path: 'me',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../container/memberCenter/PersonalDataPage/index').default)
    })
  },
  onEnter: require('../../utils/authRequired').default(store),
})
