import cookie from 'cookie'
import Immutable from 'immutable'

const {
  SET_COOKIE,
} = require('../../constants/ActionTypes').default

const initialState = Immutable.fromJS({
  lang: null,
  user: null,
  token: null,
  redirect: null,
  locale: null,
})

if (process.env.BROWSER) {
  initialState.set(cookie.parse(document.cookie))
  // initCookies = cookie.parse(document.cookie)
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_COOKIE:
      return state.set(action.cookie.name, action.cookie.value)
      // const cookiePair = {}
      // let value = action.cookie.value
      // if (typeof action.cookie.value === 'string') {
      //   value = action.cookie.value
      // } else if (typeof action.cookie.value === 'object') {
      //   value = JSON.stringify(action.cookie.value)
      // }
      // cookiePair[action.cookie.name] = value
      // return {
      //   ...state,
      //   ...cookiePair,
      // }
    default:
      return state
  }
}
