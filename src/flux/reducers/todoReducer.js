import actionTypes from '../constants/actionTypes';

export default (state = [], action) => {
  switch (action.type) {
    case actionTypes.ADD_TODO: {
      return [
        ...state,
        action.todo,
      ];
    }
    default: {
      return state;
    }
  }
};