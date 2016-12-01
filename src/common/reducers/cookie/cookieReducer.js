import cookie from 'cookie'
import {
  SET_COOKIE,
} from '../../constants/ActionTypes'

let initCookies = {}
if (process.env.BROWSER) {
  initCookies = cookie.parse(document.cookie)
} else {
  initCookies = {}
}

export default (state = initCookies, action) => {
  switch (action.type) {
    case SET_COOKIE: {
      const cookiePair = {}
      let value = action.cookie.value
      if (typeof action.cookie.value === 'string') {
        value = action.cookie.value
      } else if (typeof action.cookie.value === 'object') {
        value = JSON.stringify(action.cookie.value)
      }
      cookiePair[action.cookie.name] = value
      return {
        ...state,
        ...cookiePair,
      }
    }
    default:
      return state
  }
}
