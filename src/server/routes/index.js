import apiRoutes from './api';
import socialAuthRoutes from './socialAuth';
import ssrFetchStateRoutes from './ssrFetchState';
import ssrRoutes from './ssr';

export default ({ app }) => {
  apiRoutes({ app });
  socialAuthRoutes({ app });
  ssrFetchStateRoutes({ app });
  ssrRoutes({ app });
};
