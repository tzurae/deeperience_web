import { setCookie } from '../../common/reducers/cookie/cookieActions'

export default (req, res, next) => {
  if (req.cookies.token !== undefined && req.cookies.token !== '') {
    req.cookies.user = JSON.parse(req.cookies.user)
    req.store.dispatch(setCookie(req.cookies))
    next()
  } else {
    next()
  }
}
