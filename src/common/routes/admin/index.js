import Roles from '../../constants/Roles';
import compose from '../../utils/composeEnterHooks';

export default (store) => ({
  path: 'admin',
  getIndexRoute(location, cb) {
    require.ensure([], (require) => {
      cb(null, {
        component:
          require('../../components/pages/admin/user/ListPage').default,
      });
    });
  },
  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./user').default(store),
      ]);
    });
  },
  onEnter: compose.series(
    require('../../utils/authRequired').default(store),
    require('../../utils/roleRequired').default(store)(Roles.ADMIN),
  ),
});
