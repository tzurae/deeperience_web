import ActionTypes from '../constants/ActionTypes'

const initialState = {
  ownSites: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_OWN_SITE:
      return {
        ...state,
        ownSites: action.payload,
      }
    default: {
      return state
    }
  }
}
