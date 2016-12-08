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
} = require('../../constants/ActionTypes')

export function* login() {
  console.log('kfdjklfjklasfjklas');

}


export function* watchLogin () {
  while(true) {
    const { payload } = yield take(LOGIN)
    console.log('payload is ',payload);
    yield fork(login, payload)
  }
}

export default [
  fork(watchLogin),
]
