import ssrFetchStateController from '../controllers/ssrFetchState';

export default ({ app }) => {
  app.get('/todo', ssrFetchStateController.todo);
};