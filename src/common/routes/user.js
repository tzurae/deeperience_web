export default {
  path: 'user',
  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [{
        path: 'register',
        component: require('../views/pages/user/RegisterPage').default,
      }, {
        path: 'login',
        component: require('../views/pages/user/LoginPage').default,
      }, {
        path: 'logout',
        component: require('../views/pages/user/LogoutPage').default,
      }, {
        path: 'me',
        component: require('../views/pages/user/ShowPage').default,
        onEnter: require('../utils/authRequired').default,
      }, ]);
    });
  },
};
