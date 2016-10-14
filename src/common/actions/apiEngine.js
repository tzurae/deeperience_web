import ActionTypes from '../constants/ActionTypes';

export const setApiEngine = (apiEngine) => {
  return {
    type: ActionTypes.SET_API_ENGINE,
    apiEngine,
  };
};
