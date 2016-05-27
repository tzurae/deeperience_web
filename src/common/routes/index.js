// essential polyfill for `require.ensure`
import '../utils/ensure-polyfill';
import AppLayout from '../components/layouts/AppLayout';
import HomePage from '../components/pages/HomePage';
import notFoundRoute from './notFound';

export default (store) => ({
  path: '/',
  component: AppLayout,
  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./user').default(store),
        require('./todo').default(store),
        notFoundRoute,
      ]);
    });
  },
  indexRoute: {
    component: HomePage,
  },
});
