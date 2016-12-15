import cookie from 'cookie'
import { setCookies } from '../../common/reducers/cookie/cookieActions'

export default (req, res, next) => {
  if (req.headers.cookie !== undefined) {
    const c = cookie.parse(req.headers.cookie)
    console.log('c is', c);
    if(c.user)
    console.log('c.user is', JSON.parse(c.user));

    req.store.dispatch(setCookies(c)).then(() => {
      next()
    })
  } else {
    next()
  }
}
