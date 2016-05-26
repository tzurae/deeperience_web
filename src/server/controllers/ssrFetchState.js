import reactCookie from 'react-cookie';
import todoAPI from '../../common/api/todo';
import wrapTimeout from '../decorators/wrapTimeout';
import { loginUser } from '../../common/actions/userActions';
import { updateLocale } from '../../common/actions/intlActions';
import { setTodo } from '../../common/actions/todoActions';

export default {
  user: (req, res, next) => {
    req.store.dispatch(loginUser({
      token: reactCookie.load('token'),
      data: reactCookie.load('user'),
    }));
    next();
  },
  intl: wrapTimeout(3000)((req, res, next) => {
    const cookieLocale = reactCookie.load('locale');
    let lang;
    if (cookieLocale) {
      lang = cookieLocale;
    } else {
      lang = req.acceptsLanguages('en-us', 'zh-tw');
      reactCookie.save('locale', lang, { path: '/' });
    }
    req.store
      .dispatch(updateLocale(lang))
      .then(() => {
        next();
      }, (err) => {
        throw err;
      });
  }),
  todo: wrapTimeout(3000)((req, res, next) => {
    todoAPI(req.store.getState().apiEngine)
      .list()
      .catch((err) => {
        throw err;
      })
      .then((json) => {
        req.store.dispatch(setTodo(json.todos));
        next();
      });
  }),
};
