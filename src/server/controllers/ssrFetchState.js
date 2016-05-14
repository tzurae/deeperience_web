import reactCookie from 'react-cookie';
import localeAPI from '../../common/api/locale';
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
  intl: wrapTimeout(3000)((req, res, next) => {
    const cookieLocale = reactCookie.load('locale');
    let lang;
    if (cookieLocale) {
      lang = cookieLocale;
    } else {
      lang = req.acceptsLanguages('en-us', 'zh-tw');
      reactCookie.save('locale', lang, { path: '/' });
    }
    localeAPI
      .show(lang)
      .catch((err) => {
        throw err;
      })
      .then((json) => {
        res.setSSRState({
          intl: json,
        });
        next();
      });
  }),
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
