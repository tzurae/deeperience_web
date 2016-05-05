import ssrFetchStateController from '../controllers/ssrFetchState';

export default ({ app }) => {
  app.use('/*', ssrFetchStateController.user);
  app.get('/todo', ssrFetchStateController.todo);
};