import reactCookie from 'react-cookie';
import actionTypes from '../constants/actionTypes';

export const updateLocale = ({ locale, messages }) => {
  reactCookie.save('locale', locale, { path: '/' });
  return {
    type: actionTypes.UPDATE_LOCALE,
    locale,
    messages,
  };
};
