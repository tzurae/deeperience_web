import actionTypes from '../constants/actionTypes';

export const loginUser = ({ token, data }) => {
  return {
    type: actionTypes.LOGIN_USER,
    token,
    data,
  };
};

export const logoutUser = () => {
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