import uuid from 'uuid'
import { fromJS } from 'immutable'
import { calculateTripInfo } from '../../components/forms/trip/createTripHelper'
import createReducer from '../../lib/configureReducer'

const {
  SET_CREATE_TRIP_DATA,
  RESET_CREATE_TRIP_DATA,

  LIST_GUIDE_SITES_REQUEST,
  LIST_GUIDE_SITES_SUCCESS,
  LIST_GUIDE_SITES_FAILURE,

  CREATE_TRIP_REQUEST,
  CREATE_TRIP_SUCCESS,
  CREATE_TRIP_FAILURE,
  CREATE_TRIP_BRANCH_ERROR,
  CREATE_TRIP_NEXT_PAGE,
  CREATE_TRIP_PREVIOUS_PAGE,
  CREATE_TRIP_SET_PAGE,
  CREATE_TRIP_SET_DONE,
  CREATE_TRIP_SET_SUBMIT_ERROR,
  CREATE_TRIP_SET_SHOW_DAY,
  CREATE_TRIP_SET_TOTAL_DAY,
  CREATE_TRIP_SET_FLOAT_WINDOW,
  CREATE_TRIP_SET_COVER_PIC,
  CREATE_TRIP_SET_TREE_PIC,
} = require('../../constants/ActionTypes').default

const initialState = fromJS({
  createPage: {
    page: 1,
    done: new Array(...{ length: 5 }).map(() => false),
    tripInfo: [],
    routes: [],
    startSites: [],
    uuid2data: {},
    branchError: '',
    showDay: 0, // 目前顯示樹枝哪一天
    floatWindow: { // 浮動視窗
      top: 0,
      left: 500,
      uuid: '', // 顯示的是哪一個景點
      floatListShow: false,
      floatInfoShow: false,
    },
    totalDay: 1, // 總天數
    submitError: '', //
    coverPic: '',
    treePic: [],
  },
  ownSites: [], // 所有自己設計擁有的 site
})

export default createReducer(initialState, {
  [SET_CREATE_TRIP_DATA](state, action) {
    return state
      .setIn(['createPage', 'routes'],
        action.payload.routes || state.getIn(['createPage', 'routes']))
      .setIn(['createPage', 'tripInfo'],
        action.payload.tripInfo || state.getIn(['createPage', 'tripInfo']))
      .setIn(['createPage', 'startSites'],
        action.payload.startSites || state.getIn(['createPage', 'startSites']))
      .setIn(['createPage', 'uuid2data'],
        action.payload.uuid2data || state.getIn(['createPage', 'uuid2data']))
  },
  [RESET_CREATE_TRIP_DATA](state, action) {
    const uid = uuid()
    const tripInfo = [{
      ylayer: [1],
      sites: [{
        pos: { xpos: 0, ypos: 0 },
        uuid: uid,
      }],
      routes: [],
    }]
    const routes = [[]]
    const startSites = [uid]
    const uuid2data = {
      [uid]: {
        gid: '',
      },
    }
    return state.mergeDeep(
      fromJS({
        createPage: {
          tripInfo,
          routes,
          startSites,
          uuid2data,
        },
      }))
  },

  [LIST_GUIDE_SITES_REQUEST](state, action) { return state },
  [LIST_GUIDE_SITES_FAILURE](state, action) { return state },
  [LIST_GUIDE_SITES_SUCCESS](state, action) {
    const { sites } = action.payload
    const routes = state.getIn(['createPage', 'routes'])
    const startSites = state.getIn(['createPage', 'startSites'])
    const uuid2data = state.getIn(['createPage', 'uuid2data'])

    return state.set('ownSites', sites)
      .set('tripInfo', calculateTripInfo(routes, startSites, sites, uuid2data))
  },

  [CREATE_TRIP_REQUEST](state, action) { return state },
  [CREATE_TRIP_SUCCESS](state, action) {
    return state.setIn(['createPage', 'done'],
      state.getIn(['createPage', 'done']).map(() => true))
  },
  [CREATE_TRIP_FAILURE](state, action) { return state },

  [CREATE_TRIP_BRANCH_ERROR](state, action) {
    return state.setIn(['createPage', 'branchError'], action.payload.branchError)
  },

  [CREATE_TRIP_NEXT_PAGE](state, action) {
    return state.setIn(['createPage', 'page'], state.getIn(['createPage', 'page']) + 1)
  },
  [CREATE_TRIP_PREVIOUS_PAGE](state, action) {
    return state.setIn(['createPage', 'page'], state.getIn(['createPage', 'page']) - 1)
  },
  [CREATE_TRIP_SET_PAGE](state, action) {
    return state.setIn(['createPage', 'page'], action.payload.page)
  },

  [CREATE_TRIP_SET_DONE](state, action) {
    return state.setIn(['createPage', 'done'], action.payload.done)
  },

  [CREATE_TRIP_SET_SUBMIT_ERROR](state, action) {
    return state.setIn(['createPage', 'submitError'], action.payload.submitError)
  },

  [CREATE_TRIP_SET_SHOW_DAY](state, action) {
    return state.setIn(['createPage', 'showDay'], action.payload.showDay)
  },
  [CREATE_TRIP_SET_TOTAL_DAY](state, action) {
    return state.setIn(['createPage', 'totalDay'], action.payload.totalDay)
  },
  [CREATE_TRIP_SET_FLOAT_WINDOW](state, action) {
    return state.mergeDeep(fromJS({
      createPage: {
        floatWindow: action.payload.floatWindow,
      },
    }))
  },

  [CREATE_TRIP_SET_COVER_PIC](state, action) {
    return state.setIn(['createPage', 'coverPic'], action.payload.img)
  },
  [CREATE_TRIP_SET_TREE_PIC](state, action) {
    return state.setIn(['createPage', 'treePic'], action.payload.imgs)
  },
})
