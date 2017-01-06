import 'babel-polyfill'
import { call, fork, take, put } from 'redux-saga/effects'
import { fromJS } from 'immutable'
import tripAPI from '../../api/trip'
import ApiEngine from '../../utils/ApiEngine'
import {
  createTripRequest,
  createTripSuccess,
  createTripFailure,
  createTripNextPage,
  listGuideSitesRequest,
  listGuideSitesSuccess,
  listGuideSitesFailure,
} from './tripActions'
const {
  CREATE_TRIP,
  LIST_GUIDE_SITES,
} = require('../../constants/ActionTypes').default

const apiEngine = new ApiEngine()

const createTripAPI = trip => tripAPI(apiEngine)
  .createTrip(trip)
  .then(json => json)

const listGuideSitesAPI = () => tripAPI(apiEngine)
  .listGuideSites()
  .then(json => fromJS(json))

function* createTrip(trip) {
  try {
    yield put(createTripRequest())
    const { errors } = yield call(createTripAPI, trip)
    if (!errors) {
      yield put(createTripSuccess())
      yield put(createTripNextPage())
    } else {
      yield put(createTripFailure(errors))
    }
  } catch (error) {
    yield put(createTripFailure(error))
  }
}

function* listGuideSites() {
  try {
    yield put(listGuideSitesRequest())
    const res = yield call(listGuideSitesAPI)
    if (!res.errors) {
      yield put(listGuideSitesSuccess(res))
    } else {
      yield put(listGuideSitesFailure(res.errors))
    }
  } catch (error) {
  }
}

function* watchCreateTrip() {
  while (true) {
    const { payload: { trip } } = yield take(CREATE_TRIP)
    yield fork(createTrip, trip)
  }
}

function* watchListGuideSites() {
  while (true) {
    yield take(LIST_GUIDE_SITES)
    yield fork(listGuideSites)
  }
}

export default [
  fork(watchCreateTrip),
  fork(watchListGuideSites),
]
