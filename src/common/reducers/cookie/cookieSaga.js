import { fork, take, put, select } from 'redux-saga/effects'
import * as cookieAction from './cookieActions'
import { selectFromCookies } from '../../lib/selector'

const {
  SET_COOKIE,
  REMOVE_COOKIE,
} = require('../../constants/ActionTypes').default

// payload: any object
// there are many situation will call setCookie function to set cookies
// such as: user,token,redirect...etc

function* setCookie(payload) {
  try {
    yield put(cookieAction.setCookieRequest(payload))
    // I just wanna make sure whether if the cookie be set or not
    // so just pick the first element
    const isSetSuccess = yield select(selectFromCookies(Object.keys(payload)[0]))
    if (isSetSuccess) {
      yield put(cookieAction.setCookieSuccess())
    }
  } catch (error) {
    yield put(cookieAction.setCookieFailure())
  }
}

function* removeCookie() {
  try {
    yield put(cookieAction.removeCookieRequest())
    const token = yield select(selectFromCookies('token'))
    if (token === '') {
      yield put(cookieAction.removeCookieSuccess())
    }
  } catch (error) {
    yield put(cookieAction.removeCookieFailure())
  }
}

function* watchSetCookieRequest() {
  while (true) {
    const { payload } = yield take(SET_COOKIE)
    yield fork(setCookie, payload)
  }
}

function* watchRemoveCookie() {
  while (true) {
    yield take(REMOVE_COOKIE)
    yield fork(removeCookie)
  }
}

export default [
  fork(watchSetCookieRequest),
  fork(watchRemoveCookie),
]
