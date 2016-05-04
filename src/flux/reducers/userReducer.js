import actionTypes from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_USER: {
      return {
        token: action.token,
        data: action.data,
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
        data: action.data,
      };
    }
    default: {
      return state;
    }
  }
};