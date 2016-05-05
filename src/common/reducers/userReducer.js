import reactCookie from 'react-cookie';
import actionTypes from '../constants/actionTypes';

const normalizeUserData = (data) => {
  let d = {};
  if (typeof data === 'string') {
    d = JSON.parse(data);
  } else if (typeof data === 'object') {
    d = data;
  } else if (typeof data === 'undefined') {
    d = {};
  } else {
    throw new TypeError(`Invalid user data type ${typeof data}`);
  }
  return d;
};

const initUser = {
  token: reactCookie.load('token'),
  data: normalizeUserData(reactCookie.load('user')),
};

export default (state = initUser, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_USER: {
      return {
        token: action.token,
        data: normalizeUserData(action.data),
      };
    }
    case actionTypes.LOGOUT_USER: {
      return {};
    }
    case actionTypes.SET_USER_TOKEN: {
      return {
        ...state,
        token: action.token,
      };
    }
    case actionTypes.SET_USER_DATA: {
      return {
        ...state,
        data: normalizeUserData(action.data),
      };
    }
    default: {
      return state;
    }
  }
};
