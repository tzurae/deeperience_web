import ActionTypes from '../../constants/ActionTypes'
import localeAPI from '../../api/locale'
import { setCookie } from '../cookie/cookieActions'

export const updateLocale = (targetLocale) => {
  return (dispatch, getState) => {
    const currentLocale = getState().intl.locale
    if (targetLocale === currentLocale) {
      return Promise.resolve()
    }
    console.log(getState())
    return localeAPI(getState().global.apiEngine)
      .read(targetLocale)
      .then((json) => {
        dispatch(setCookie('locale', json.locale))
        dispatch({
          type: ActionTypes.UPDATE_LOCALE,
          locale: json.locale,
          messages: json.messages,
        })
      }, (err) => {
        dispatch(setCookie('locale', currentLocale))
        return Promise.reject(err)
      })
  }
}
