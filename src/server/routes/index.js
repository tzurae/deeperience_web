import apiRoutes from './api';
import ssrRoutes from './ssr';

export default ({ app }) => {
  apiRoutes({ app });
  ssrRoutes({ app });
};