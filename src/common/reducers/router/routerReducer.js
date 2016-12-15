import { LOCATION_CHANGE } from 'react-router-redux'
import { fromJS } from 'immutable'
import createReducer from '../../lib/configureReducer'

const initialState = fromJS({
  locationBeforeTransitions: null,
})

export default createReducer(initialState, {
  [LOCATION_CHANGE](state, action) {
    return state.merge({
      locationBeforeTransitions: action.payload,
    })
  },
})
