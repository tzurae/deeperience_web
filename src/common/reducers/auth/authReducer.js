import { fromJS } from 'immutable'
import cookie from 'cookie'
import createReducer from '../../lib/configureReducer'

const {
  LOGOUT,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,

  LOGIN,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
} = require('../../constants/ActionTypes').default

const initialState = fromJS({
  isAuth: false,
})

export default createReducer(initialState, {
  [LOGIN](state, action) { return state },
  [LOGIN_REQUEST](state, action) { return state },
  [LOGIN_SUCCESS](state, action) {
    return state.set('isAuth', true)
  },
  [LOGOUT](state, action) { return state },
  [LOGOUT_REQUEST](state, action) { return state },
  [LOGOUT_SUCCESS](state, action) {
    return state.set('isAuth', false)
  },
  [LOGOUT_FAILURE](state, action) { return state },
})
