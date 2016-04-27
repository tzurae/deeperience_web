import actionTypes from '../constants/actionTypes';

export default (state = [], action) => {
  switch (action.type) {
    case actionTypes.SET_TODO: {
      return [
        ...action.todos,
      ];
    }
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