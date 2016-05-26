import actionTypes from '../constants/actionTypes';

let initState = null;

export default (state = initState, action) => {
  switch (action.type) {
    case actionTypes.SET_API_ENGINE: {
      return action.apiEngine;
    }
    default: {
      return state;
    }
  }
};
