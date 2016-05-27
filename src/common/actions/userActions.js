import { setCookies, removeCookie } from './cookieActions';

export const loginUser = ({ token, data }) => {
  return (dispatch) => {
    return dispatch(setCookies({
      token,
      user: data,
    }));
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch(removeCookie('token'));
    dispatch(removeCookie('user'));
  };
};
