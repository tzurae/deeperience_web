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
        ...state,
        action.todo,
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
