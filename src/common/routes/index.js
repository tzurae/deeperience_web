import AppLayout from '../views/layouts/AppLayout';
import HomePage from '../views/pages/HomePage';
import notFoundRoute from './notFound';

// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') {
  require.ensure = (d, c) => c(require);
}

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
