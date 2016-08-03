import actionTypes from '../constants/actionTypes';

let initState = [];

export default (state = initState, action) => {
  if (!action.errors) {
    action.errors = [];
  }
  switch (action.type) {
    case actionTypes.PUSH_ERRORS: {
      return [
        ...state,
        ...action.errors.map((error) => ({
          id: Math.random(),
          ...error,
        })),
      ];
    }
    case actionTypes.REMOVE_ERROR: {
      return [
        ...state.filter(error => error.id !== action.id),
      ];
    }
    default: {
      return state;
    }
  }
};
