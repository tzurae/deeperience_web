/*
 * ## Edit by: Rae
 * ## Time: 2016/12/08
 */
import { call, fork, take, put } from 'redux-saga/effects'
import * as authActions from './authAction'
import * as cookieActions from '../cookie/cookieActions'
import userAPI from '../../api/user'
import ApiEngine from '../../utils/ApiEngine'
import { push } from 'react-router-redux'

const {
  LOGIN,
  LOGOUT,
  REGISTER,
} = require('../../constants/ActionTypes').default

const apiEngine = new ApiEngine()

function loginAPI(userData) {
  return userAPI(apiEngine)
    .login(userData)
    .then(json => json)
}

function* login(payload) {
  try {
    yield put(authActions.loginRequest())
    yield put(authActions.getDataFromApiServerRequest())
    const { isAuth, token, user } = yield call(loginAPI, payload)
    if (isAuth) {
      yield put(authActions.getDataFromApiServerSuccess())
      yield put(cookieActions.setCookie({ token, user }))
      yield put(authActions.loginSuccess())
      yield put(push('/'))
    }
  } catch (error) {
    yield put(authActions.getDataFromApiServerFailure())
    yield put(authActions.loginFailure())
  }
}

function* logout() {
  try {
    yield put(authActions.logoutRequest())
    yield put(cookieActions.removeCookie())
    yield put(authActions.logoutSuccess())
    yield put(push('/'))
  } catch (error) {
    yield put(authActions.logoutFailure())
  }
}

// function* register() {
//   try {
//     yield put(authActions.registerRequest())
//     yield put(authActions.setDataFromApiServerRequest())
//
//     yield put(cookieActions.removeCookie())
//     yield put(authActions.logoutSuccess())
//     yield put(push('/'))
//   } catch (error) {
//     yield put(authActions.logoutFailure())
//   }
// }

// ---------WATCH START------------

function* watchLogin() {
  while (true) {
    const { payload } = yield take(LOGIN)
    yield fork(login, payload)
  }
}

function* watchLogout() {
  while (true) {
    yield take(LOGOUT)
    yield fork(logout)
  }
}

// function* watchRegister() {
//   while( true ) {
//     const { payload } = yield take(REGISTER)
//     yield fork(register, payload)
//   }
// }

export default [
  fork(watchLogin),
  fork(watchLogout),
  // fork(watchRegister),
]
