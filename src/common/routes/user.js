export default (store) => ({
  path: 'user',
  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [{
        path: 'register',
        component: require('../components/pages/user/RegisterPage').default,
      }, {
        path: 'login',
        component: require('../components/pages/user/LoginPage').default,
      }, {
        path: 'logout',
        component: require('../components/pages/user/LogoutPage').default,
      }, {
        path: 'me',
        component: require('../components/pages/user/ShowPage').default,
        onEnter: require('../utils/authRequired').default(store),
      }, ]);
    });
  },
});
