export default (store) => ({
  path: 'phase',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../container/order/MyOrderPhasePage').default)
    })
  },
  onEnter: require('../../utils/authRequired').default(store),
})
