import actionTypes from '../constants/actionTypes';
import localeAPI from '../api/locale';
import { setCookie } from './cookieActions';

export const updateLocale = (targetLocale) => {
  return (dispatch, getState) => {
    const currentLocale = getState().intl.locale;
    if (targetLocale === currentLocale) {
      return Promise.resolve();
    }
    return localeAPI(getState().apiEngine)
      .read(targetLocale)
      .then((json) => {
        dispatch(setCookie('locale', json.locale));
        dispatch({
          type: actionTypes.UPDATE_LOCALE,
          locale: json.locale,
          messages: json.messages,
        });
      }, (err) => {
        dispatch(setCookie('locale', currentLocale));
        return Promise.reject(err);
      });
  };
};
