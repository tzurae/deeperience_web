import actionTypes from '../constants/actionTypes';

export const setApiEngine = (apiEngine) => {
  return {
    type: actionTypes.SET_API_ENGINE,
    apiEngine,
  };
};
