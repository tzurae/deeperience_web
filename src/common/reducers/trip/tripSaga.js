import { call, fork, take, put } from 'redux-saga/effects'
import {
  createTripRequest,
  createTripSuccess,
  createTripFailure,
} from './tripActions'
import tripAPI from '../../api/trip'
const {
  CREATE_TRIP,
  CREATE_TRIP_REQUEST,
  CREATE_TRIP_SUCCESS,
  CREATE_TRIP_FAILURE,
} = require('../../constants/ActionTypes').default

const {
} = require('../../constants/ActionTypes').default

export function* createTrip(payload) {
  try {
    yield put(createTripRequest)
    const res = yield tripAPI().createTrip
    if (!res.errors) {
      yield put(createTripSuccess)
      nextPage()
    } else {
      yield put(createTripFailure, res.errors)
    }
  } catch (error) {
    yield put(createTripFailure, error)
  }
}

export function* watchCreateTrip() {
  while (true) {
    const { payload } = yield take(CREATE_TRIP)
    yield fork(createTrip, payload)
  }
}

export default [
  fork(watchCreateTrip),
]
