/*
 * ## Edit by: Rae
 * ## Time: 2016/12/08
 */
import { call, fork, take, put } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import { fetchErrorCode } from '../../lib/fetchError'
import userAPI from '../../api/user'
import ApiEngine from '../../utils/ApiEngine'
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  openRegisterVerifyModal,
  setUser,
  removeUser,
} from './authActions'

import {
  setCookie,
  removeCookie,
} from '../cookie/cookieActions'

const {
  LOGIN,
  LOGOUT,
  REGISTER,
} = require('../../constants/ActionTypes').default

const apiEngine = new ApiEngine()

const loginAPI = userData => {
  return userAPI(apiEngine)
    .login(userData)
    .then(json => json)
}

const logoutAPI = () => {
  return userAPI(apiEngine)
    .logout()
    .then(json => json)
}

const registerAPI = formData => {
  return userAPI(apiEngine)
    .register(formData)
    .then(json => json)
}

function* login(payload) {
  try {
    yield put(loginRequest())
    const { isAuth, token, user, errors } = yield call(loginAPI, payload)
    if (!errors && isAuth) {
      yield put(setCookie({ token }))
      yield put(setUser(user))
      yield put(loginSuccess())
      yield put(push('/'))
    } else if (!isAuth) {
      yield put(loginFailure(['WRONG_EMAIL_PASSWORD'])) // i18n id
    } else {
      yield put(loginFailure(errors))
    }
  } catch (error) {
    yield put(loginFailure(fetchErrorCode(error)))
  }
}

function* logout() {
  try {
    yield put(logoutRequest())
    const { isLogout, errors } = yield call(logoutAPI)
    if (!errors && isLogout) {
      yield put(removeCookie())
      yield put(removeUser())
      yield put(logoutSuccess())
      yield put(push('/'))
    }
  } catch (error) {
    yield put(logoutFailure(fetchErrorCode(error)))
  }
}

function* register(payload) {
  try {
    yield put(registerRequest())
    const { email, user, errors } = yield call(registerAPI, payload)
    if (!errors && email && user) {
      yield put(registerSuccess())
      yield put(openRegisterVerifyModal())
    }
  } catch (error) {
    yield put(registerFailure(fetchErrorCode(error)))
  }
}

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

function* watchRegister() {
  while (true) {
    const { payload } = yield take(REGISTER)
    yield fork(register, payload)
  }
}

export default [
  fork(watchLogin),
  fork(watchLogout),
  fork(watchRegister),
]
