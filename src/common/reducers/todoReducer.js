import ActionTypes from '../constants/ActionTypes';

export default (state = [], action) => {
  switch (action.type) {
    case ActionTypes.SET_TODO: {
      return [
        ...action.todos,
      ];
    }
    case ActionTypes.ADD_TODO: {
      return [
        action.todo,
        ...state,
      ];
    }
    case ActionTypes.REMOVE_TODO: {
      return [
        ...state.filter(todo => todo._id !== action.id),
      ];
    }
    default: {
      return state;
    }
  }
};
