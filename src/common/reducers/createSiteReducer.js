import ActionTypes from '../constants/ActionTypes'

const inititialState = {
  page: 0,
}

export default (state = inititialState, action) => {
  switch (action.type) {
    case ActionTypes.CREATE_SITE_NEXT_PAGE:
      return {
        ...state,
        page: state.page + 1,
      }
    case ActionTypes.CREATE_SITE_PREVIOUS_PAGE:
      return {
        ...state,
        page: state.page - 1,
      }
    case ActionTypes.CREATE_SITE_SET_PAGE:
      return {
        ...state,
        page: action.payload,
      }
    default: {
      return state
    }
  }
}
