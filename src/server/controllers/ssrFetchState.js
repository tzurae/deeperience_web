import Errors from '../../common/constants/Errors'
import wrapTimeout from '../decorators/wrapTimeout'
import { updateLocale } from '../../common/reducers/global/globalActions'
import { loginSuccess } from '../../common/reducers/auth/authAction'

export default {
  user: (req, res, next) => {
    if(!req.store.getState().getIn(['cookies','user']).isEmpty()) {
      req.store.dispatch(loginSuccess())
      next()
    }
    next()
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
