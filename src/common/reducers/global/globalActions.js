import localeAPI from '../../api/locale'
import { setCookie } from '../cookie/cookieActions'
const {
  SET_API_ENGINE,
  UPDATE_LOCALE,
} = require('../../constants/ActionTypes').default

export const setApiEngine = apiEngine => {
  return {
    type: SET_API_ENGINE,
    apiEngine,
  }
}

export const updateLocale = (targetLocale) => {
  return (dispatch, getState) => {
    const currentLocale = getState().getIn(['global', 'locale'])
    if (targetLocale === currentLocale) {
      return Promise.resolve()
    }
    return localeAPI(getState().getIn(['global', 'apiEngine']))
      .read(targetLocale)
      .then((json) => {
        dispatch(setCookie({ locale: json.locale }))
        dispatch({
          type: UPDATE_LOCALE,
          locale: json.locale,
          messages: json.messages,
        })
      })
      .catch((err) => {
        dispatch(setCookie('locale', currentLocale))
        return Promise.reject(err)
      })
  }
}

