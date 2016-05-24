import cookie from 'cookie';
import { setCookies } from '../../common/actions/cookieActions';

export default (req, res, next) => {
  if (req.headers.cookie !== undefined) {
    let c = cookie.parse(req.headers.cookie);
    req.store.dispatch(setCookies(c)).then(() => {
      next();
    });
  } else {
    next();
  }
};
