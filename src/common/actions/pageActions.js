import ActionTypes from '../constants/ActionTypes';

export const setPage = (resourceName, page) => {
  return {
    type: ActionTypes.SET_PAGE,
    resourceName,
    page,
  };
};

export const setCrrentPage = (resourceName, currentPage) => {
  return {
    type: ActionTypes.SET_CURRENT_PAGE,
    resourceName,
    currentPage,
  };
};
