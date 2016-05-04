import todoAPI from '../../flux/api/todo';
import wrapTimeout from '../decorators/wrapTimeout';

export default {
  todo: wrapTimeout(3000)((req, res, next) => {
    todoAPI
      .list()
      .catch((err) => {
        throw err;
      })
      .then((json) => {
        res.setSSRState({ todos: json.todos });
        next();
      });
  }),
};