import { setCookie } from '../../common/reducers/cookie/cookieActions'

export default (req, res, next) => {
  if (req.cookies.token !== undefined && req.cookies.token !== '') {
    req.store.dispatch(setCookie(req.cookies))
  }
  next()
}
