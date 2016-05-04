import todoAPI from '../../flux/api/todo';
import wrapTimeout from '../decorators/wrapTimeout';

export default {
  user: (req, res, next) => {
    res.setSSRState({
      user: {
        token: req.cookies['token'],
        data: req.user,
      },
    });
    next();
  },
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