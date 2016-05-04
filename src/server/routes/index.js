import apiRoutes from './api';
import ssrFetchStateRoutes from './ssrFetchState';
import ssrRoutes from './ssr';

export default ({ app }) => {
  apiRoutes({ app });
  ssrFetchStateRoutes({ app });
  ssrRoutes({ app });
};