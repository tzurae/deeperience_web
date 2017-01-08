import { fromJS } from 'immutable'
import createReducer from '../../lib/configureReducer'

const {
  LOGOUT,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,

  LOGIN,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,

  REGISTER,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,

  OPEN_REGISTER_VERIFY_MODAL,
  CLOSE_REGISTER_VERIFY_MODAL,

  SET_USER,
  REMOVE_USER,
} = require('../../constants/ActionTypes').default

const initialState = fromJS({
  user: {},
  isAuth: false,
  verifyModal: false,
  loginError: [],
  registerError: [],
  registerFetching: false,
})

export default createReducer(initialState, {
  [LOGIN](state, action) { return state },
  [LOGIN_REQUEST](state, action) { return state },
  [LOGIN_SUCCESS](state, action) {
    return state.set('isAuth', true)
  },
  [LOGIN_FAILURE](state, action) {
    return state.set('loginError', action.payload)
  },

  [LOGOUT](state, action) { return state },
  [LOGOUT_REQUEST](state, action) { return state },
  [LOGOUT_SUCCESS](state, action) {
    return state.set('isAuth', false)
  },
  [LOGOUT_FAILURE](state, action) { return state },

  [REGISTER](state, action) { return state },
  [REGISTER_REQUEST](state, action) {
    return state.set('registerFetching', true)
  },
  [REGISTER_FAILURE](state, action) {
    return state.set('registerError', action.payload)
                .set('registerFetching', false)
  },
  [REGISTER_SUCCESS](state, action) {
    return state.set('registerFetching', false)
  },

  [OPEN_REGISTER_VERIFY_MODAL](state, action) {
    return state.set('verifyModal', true)
  },
  [CLOSE_REGISTER_VERIFY_MODAL](state, action) {
    return state.set('verifyModal', false)
  },
  [SET_USER](state, action) {
    return state.set('user', fromJS(action.payload))
  },
  [REMOVE_USER](state, action) {
    return state.set('user', fromJS({}))
  },
})
