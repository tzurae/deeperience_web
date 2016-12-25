import { Map, fromJS } from 'immutable'
import createReducer from '../../lib/configureReducer'
const {
  PUSH_ERRORS,
  REMOVE_ERROR,
} = require('../../constants/ActionTypes').default

const initialState = fromJS([])

export default createReducer(initialState, {
  [PUSH_ERRORS](state, action) {
    if (!action.payload.errors) return state

    let newState = state
    action.payload.errors.forEach(error => {
      newState = newState.push(
        Map({
          id: Math.random(),
          errorMessage: error,
        })
      )
    })
    return newState
  },
  [REMOVE_ERROR](state, action) {
    return state.filter(error => error.get('id') !== action.errors.id)
  },
})
