import reactCookie from 'react-cookie';
import actionTypes from '../constants/actionTypes';

export const loginUser = ({ token, data }) => {
  reactCookie.save('token',  token, { path: '/' });
  reactCookie.save('user',  data, { path: '/' });
  return {
    type: actionTypes.LOGIN_USER,
    token,
    data,
  };
};

export const logoutUser = () => {
  reactCookie.remove('token');
  reactCookie.remove('user');
  return {
    type: actionTypes.LOGOUT_USER,
  };
};

export const setUserToken = (token) => {
  return {
    type: actionTypes.SET_USER_TOKEN,
    token,
  };
};

export const setUserData = (data) => {
  return {
    type: actionTypes.SET_USER_DATA,
    data,
  };
};
