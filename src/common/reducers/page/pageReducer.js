import { Map } from 'immutable'
const {
  SET_PAGE,
  SET_CURRENT_PAGE,
} = require('../../constants/ActionTypes').default

const defaultPage = {
  skip: 0,
  limit: 20,
  first: 1,
  current: 1,
  last: 1,
  total: 1,
}

const initialState = Map({
  default: defaultPage,
})

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PAGE:
      return state.set([action.resourceName], action.page || defaultPage)
      // {
      //   ...state,
      //   [action.resourceName]: action.page || defaultPage,
      // }
    case SET_CURRENT_PAGE:
      // const page = state[action.resourceName]
      return state.set([action.resourceName], action.currentPage)
      // {
      //   ...state,
      //   [action.resourceName]: {
      //     ...page,
      //     current: Number(action.currentPage),
      //   },
      // }
    default:
      return state
  }
}
