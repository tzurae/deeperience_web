export default (store) => ({
  path: 'verification',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../components/pages/user/VerificationPage').default);
    });
  },
});
