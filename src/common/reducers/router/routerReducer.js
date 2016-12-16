import { LOCATION_CHANGE } from 'react-router-redux'
import { fromJS } from 'immutable'
import createReducer from '../../lib/configureReducer'

const initialState = fromJS({
  locationBeforeTransitions: null,
})

export default createReducer(initialState, {
  [LOCATION_CHANGE](state, action) {
    console.log('state is', state);
    console.log('action.payload', action.payload);
    return state.merge({
      locationBeforeTransitions: action.payload,
    })
  },
})
