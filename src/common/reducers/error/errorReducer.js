import { List, Map } from 'immutable'
const {
  PUSH_ERRORS,
  REMOVE_ERROR,
} = require('../../constants/ActionTypes')

const initialState = List()

export default (state = initialState, action) => {
  if (!action.errors) {
    action.errors = List([])
  }
  switch (action.type) {
    case PUSH_ERRORS:
      return action.errors.map((error) => {
        state.push(
          Map({
            id: Math.random(),
            errorMessage: error,
          })
        )
      })
    // return [
    //   ...state,
    //   ...action.errors.map((error) => ({
    //     id: Math.random(),
    //     ...error,
    //   })),
    // ]
    case REMOVE_ERROR:
      return
      state.filter(error => error.id !== action.errors.id)
    // [
    //   ...state.filter(error => error.id !== action.id),
    // ]
    default:
      return state

  }
}
