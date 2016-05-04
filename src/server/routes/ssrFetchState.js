import authRequired from '../middlewares/authRequired';
import ssrFetchStateController from '../controllers/ssrFetchState';

export default ({ app }) => {
  app.use('/user/me', authRequired, ssrFetchStateController.user);
  app.get('/todo', ssrFetchStateController.todo);
};