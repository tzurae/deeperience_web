import { push } from 'react-router-redux';
import { setCookie } from './cookieActions';

export const redirect = (path) => {
  return (dispatch) => {
    dispatch(setCookie('redirect', path));
    dispatch(push(path));
  };
};
