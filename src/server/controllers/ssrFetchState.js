import reactCookie from 'react-cookie';
import todoAPI from '../../common/api/todo';
import wrapTimeout from '../decorators/wrapTimeout';

export default {
  user: (req, res, next) => {
    res.setSSRState({
      user: {
        token: reactCookie.load('token'),
        data: reactCookie.load('user'),
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