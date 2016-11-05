import ActionTypes from '../constants/ActionTypes'

const initState = null

export default (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.SET_API_ENGINE: {
      return action.apiEngine
    }
    default: {
      return state
    }
  }
}
