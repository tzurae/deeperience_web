import ActionTypes from '../constants/ActionTypes';

let initState = null;

export default (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.SET_API_ENGINE: {
      return action.apiEngine;
    }
    default: {
      return state;
    }
  }
};
