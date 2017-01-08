import passport from 'passport'
import handleError, { handlePassportError } from '../decorators/handleError'
import Errors from '../../common/constants/Errors'
import wrapTimeout from '../decorators/wrapTimeout'
import { updateLocale } from '../../common/reducers/global/globalActions'
import { loginSuccess, setUser } from '../../common/reducers/auth/authActions'

export default {
  user: (req, res, next) => {
    if (req.store.getState().getIn(['cookies', 'token']) !== '') {
      passport.authenticate(
        'jwt',
        { session: false },
        handleError(res)((user, info) => {
          handlePassportError(res)((user) => {
            if (user) {
              req.store.dispatch(setUser(user))
              req.store.dispatch(loginSuccess())
            }
            next()
          })(info, user)
        })
      )(req, res, next)
    } else {
      next()
    }
  },
  intl: wrapTimeout(3000)((req, res, next) => {
    const cookieLocale = req.store.getState().getIn(['cookies', 'locale'])
    let lang
    if (cookieLocale) {
      lang = cookieLocale
    } else {
      lang = req.acceptsLanguages('en-us', 'zh-tw')
    }
    req.store
      .dispatch(updateLocale(lang))
      .then(() => {
        next()
      }, () => {
        res.pushError(Errors.STATE_PRE_FETCHING_FAIL, {
          detail: 'Cannot setup locale',
        })
        next()
      })
  }),
}
