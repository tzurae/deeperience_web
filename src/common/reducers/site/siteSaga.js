import 'babel-polyfill'
import { call, fork, take, put } from 'redux-saga/effects'
import ApiEngine from '../../utils/ApiEngine'
import {
  createSiteRequest,
  createSiteSuccess,
  createSiteFailure,
  createSiteNextPage,
} from './siteActions'
import siteAPI from '../../api/site'
const {
  CREATE_SITE,
} = require('../../constants/ActionTypes').default

const apiEngine = new ApiEngine()

const createSiteAPI = site => siteAPI(apiEngine)
  .createSite(site)
  .then(json => json)

function* createSite(site) {
  try {
    yield put(createSiteRequest())
    const { errors } = yield call(createSiteAPI, site)
    if (!errors) {
      yield put(createSiteSuccess())
      yield put(createSiteNextPage())
    } else {
      yield put(createSiteFailure(errors))
    }
  } catch (error) {
    yield put(createSiteFailure(error))
  }
}

function* watchCreateSite() {
  while (true) {
    const { payload: { site } } = yield take(CREATE_SITE)
    yield fork(createSite, site)
  }
}

export default [
  fork(watchCreateSite),
]
