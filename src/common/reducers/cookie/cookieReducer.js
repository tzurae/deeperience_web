import cookie from 'js-cookie'
import { fromJS } from 'immutable'
import createReducer from '../../lib/configureReducer'

const {
  SET_COOKIE,
  SET_COOKIE_REQUEST,
  SET_COOKIE_SUCCESS,
  SET_COOKIE_FAILURE,

  REMOVE_COOKIE,
  REMOVE_COOKIE_REQUEST,
  REMOVE_COOKIE_SUCCESS,
  REMOVE_COOKIE_FAILURE,

} = require('../../constants/ActionTypes').default

const initialState = fromJS({
  lang: '',
  token: '',
  redirect: '',
  locale: '',
})

export default createReducer(initialState, {
  [SET_COOKIE](state, action) { return state },
  [SET_COOKIE_REQUEST](state, action) {
    if (process.env.BROWSER) {
      Object.keys(action.payload).forEach(cookieEle => {
        // js-cookie will automatically transfer object to string using JSON.stringify
        document.cookie = cookie.set(cookieEle, action.payload[cookieEle])
      })
    }
    return state.merge(action.payload)
  },
  [SET_COOKIE_SUCCESS](state, action) { return state },
  [SET_COOKIE_FAILURE](state, action) { return state },
  [REMOVE_COOKIE](state, action) { return state },
  [REMOVE_COOKIE_REQUEST](state, action) {
    if (process.env.BROWSER) {
      document.cookie.split(';').forEach(
        (c) => {
          document.cookie = c.replace(/^ +/, '').replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`)
        })
    }
    return state.merge(initialState)
  },
  [REMOVE_COOKIE_SUCCESS](state, action) { return state },
  [REMOVE_COOKIE_FAILURE](state, action) { return state },
})
