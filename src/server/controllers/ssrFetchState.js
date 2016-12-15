import Errors from '../../common/constants/Errors'
import wrapTimeout from '../decorators/wrapTimeout'
import { loginUser } from '../../common/reducers/user/userActions'
import { updateLocale } from '../../common/reducers/global/globalActions'

export default {
  user: (req, res, next) => {

    const cookies = req.store.getState().get('cookies');
    console.log('cookie',cookies);

    req.store.dispatch(loginUser({
      token: cookies.get('token'),
      data: cookies.get('user'),
    }))
    next()
  },
  intl: wrapTimeout(3000)((req, res, next) => {
    const cookieLocale = req.store.getState().getIn(['cookies','locale'])
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
