/*
 * ## Edit by: Rae
 * ## Time: 2016/12/08
 */
import { call, fork, take, put } from 'redux-saga/effects'
import * as authActions from './authAction'
import userAPI from '../../api/user'


const {
  LOGIN,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} = require('../../constants/ActionTypes').default

export function* login() {
  try {
    yield put(authActions.loginRequest)

    const user = yield call
  } catch(error) {
    yield put(authActions.loginFailure)
  }
}


export function* watchLogin () {
  while(true) {
    const { payload } = yield take(LOGIN)
    yield fork(login, payload)
  }
}

export default [
  fork(watchLogin),
]
