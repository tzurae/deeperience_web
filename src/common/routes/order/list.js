export default (store) => ({
  path: 'list',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../container/order/MyOrderPage').default)
    })
  },
  onEnter: require('../../utils/authRequired').default(store),
})
