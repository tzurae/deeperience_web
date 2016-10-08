import Errors from '../../common/constants/Errors';
import todoAPI from '../../common/api/todo';
import wrapTimeout from '../decorators/wrapTimeout';
import { loginUser } from '../../common/actions/userActions';
import { updateLocale } from '../../common/actions/intlActions';
import { setTodo } from '../../common/actions/todoActions';

export default {
  user: (req, res, next) => {
    let { cookie } = req.store.getState();
    req.store.dispatch(loginUser({
      token: cookie.token,
      data: cookie.user,
    }));
    next();
  },
  intl: wrapTimeout(3000)((req, res, next) => {
    const cookieLocale = req.store.getState().cookie.locale;
    let lang;
    if (cookieLocale) {
      lang = cookieLocale;
    } else {
      lang = req.acceptsLanguages('en-us', 'zh-tw');
    }
    req.store
      .dispatch(updateLocale(lang))
      .then(() => {
        next();
      }, () => {
        res.pushError(Errors.STATE_PRE_FETCHING_FAIL, {
          detail: 'Cannot setup locale',
        });
        next();
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
