import ActionTypes from '../constants/ActionTypes';

let defaultPage = {
  skip: 0,
  limit: 20,
  first: 1,
  current: 1,
  last: 1,
  total: 1,
};

let initState = {
  default: defaultPage,
};

export default (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.SET_PAGE: {
      return {
        ...state,
        [action.resourceName]: action.page || defaultPage,
      };
    }
    case ActionTypes.SET_CURRENT_PAGE: {
      let page = state[action.resourceName];

      return {
        ...state,
        [action.resourceName]: {
          ...page,
          current: Number(action.currentPage),
        },
      };
    }
    default: {
      return state;
    }
  }
};
