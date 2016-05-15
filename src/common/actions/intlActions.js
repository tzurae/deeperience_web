import reactCookie from 'react-cookie';
import actionTypes from '../constants/actionTypes';
import localeAPI from '../api/locale';

export const updateLocale = (targetLocale) => {
  return (dispatch, getState) => {
    const currentLocale = getState().intl.locale;
    if (targetLocale === currentLocale) {
      return Promise.resolve();
    }
    return localeAPI
      .show(targetLocale)
      .then((json) => {
        reactCookie.save('locale', json.locale, { path: '/' });
        dispatch({
          type: actionTypes.UPDATE_LOCALE,
          locale: json.locale,
          messages: json.messages,
        });
      }, (err) => {
        reactCookie.save('locale', currentLocale, { path: '/' });
        return Promise.reject(err);
      });
  };
};
