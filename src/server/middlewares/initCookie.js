import cookie from 'cookie'
import { setCookies } from '../../common/reducers/cookie/cookieActions'

export default (req, res, next) => {
  if (req.headers.cookie !== undefined) {
    const c = cookie.parse(req.headers.cookie)
    req.store.dispatch(setCookies(c)).then(() => {
      next()
    })
  } else {
    next()
  }
}
