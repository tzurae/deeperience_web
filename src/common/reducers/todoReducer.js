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
    case actionTypes.REMOVE_TODO: {
      return [
        ...state.filter(todo => todo._id !== action.id),
      ];
    }
    default: {
      return state;
    }
  }
};
