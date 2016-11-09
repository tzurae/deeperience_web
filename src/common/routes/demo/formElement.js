export default (store) => ({
  path: 'form-element',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../components/pages/demo/FormElementPage').default);
    });
  },
});
