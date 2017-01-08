export default (store) => ({
  path: 'guide',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../container/memberCenter/GuideIntroPage').default)
    })
  },
  onEnter: require('../../utils/authRequired').default(store),
})
