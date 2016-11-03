// essential polyfill for `require.ensure`
import '../utils/ensure-polyfill';
import AppLayout from '../components/layouts/AppLayout';

export default (store) => ({
  path: '/',
  component: AppLayout,
  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./admin').default(store),
        require('./user').default(store),
        require('./todo').default(store),
        require('./notFound').default(store),
      ]);
    });
  },
  getIndexRoute(location, cb) {
    require.ensure([], (require) => {
      cb(null, {
        component: require('../components/pages/HomePage').default,
      });
    });
  },
});
