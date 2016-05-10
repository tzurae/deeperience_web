// essential polyfill for `require.ensure`
import '../utils/ensure-polyfill';
import AppLayout from '../views/layouts/AppLayout';
import HomePage from '../views/pages/HomePage';
import notFoundRoute from './notFound';

export default {
  path: '/',
  component: AppLayout,
  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./user').default,
        require('./todo').default,
        notFoundRoute,
      ]);
    });
  },
  indexRoute: {
    component: HomePage,
  },
};
