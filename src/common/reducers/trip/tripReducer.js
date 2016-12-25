import uuid from 'uuid'
import { fromJS } from 'immutable'
import { calculateTripInfo } from '../../components/forms/trip/createTripHelper'

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
      uuid: '',
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

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CREATE_TRIP_DATA:
      return state
        .setIn(['createPage', 'routes'],
          action.payload.routes || state.getIn(['createPage', 'routes']))
        .setIn(['createPage', 'tripInfo'],
          action.payload.tripInfo || state.getIn(['createPage', 'tripInfo']))
        .setIn(['createPage', 'startSites'],
          action.payload.startSites || state.getIn(['createPage', 'startSites']))
        .setIn(['createPage', 'uuid2data'],
          action.payload.uuid2data || state.getIn(['createPage', 'uuid2data']))

    case RESET_CREATE_TRIP_DATA: {
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
    }

    case LIST_GUIDE_SITES_REQUEST:
    case LIST_GUIDE_SITES_FAILURE:
      return state

    case LIST_GUIDE_SITES_SUCCESS:
      const { sites } = action.payload
      const routes = state.getIn(['createPage', 'routes'])
      const startSites = state.getIn(['createPage', 'startSites'])
      const uuid2data = state.getIn(['createPage', 'uuid2data'])

      return state.set('ownSites', sites)
                  .set('tripInfo', calculateTripInfo(routes, startSites, sites, uuid2data))

    case CREATE_TRIP_REQUEST:
    case CREATE_TRIP_SUCCESS:
    case CREATE_TRIP_FAILURE:
      return state

    case CREATE_TRIP_BRANCH_ERROR:
      return state.setIn(['createPage', 'branchError'], action.payload.branchError)

    case CREATE_TRIP_NEXT_PAGE:
      return state.setIn(['createPage', 'page'], state.getIn(['createPage', 'page']) + 1)

    case CREATE_TRIP_PREVIOUS_PAGE:
      return state.setIn(['createPage', 'page'], state.getIn(['createPage', 'page']) - 1)

    case CREATE_TRIP_SET_PAGE:
      return state.setIn(['createPage', 'page'], action.payload.page)

    case CREATE_TRIP_SET_DONE:
      return state.setIn(['createPage', 'done'], action.payload.done)

    case CREATE_TRIP_SET_SUBMIT_ERROR:
      return state.setIn(['createPage', 'submitError'], action.payload.submitError)

    case CREATE_TRIP_SET_SHOW_DAY:
      return state.setIn(['createPage', 'showDay'], action.payload.showDay)

    case CREATE_TRIP_SET_TOTAL_DAY:
      return state.setIn(['createPage', 'totalDay'], action.payload.totalDay)

    case CREATE_TRIP_SET_FLOAT_WINDOW:
      return state.mergeDeep(fromJS({
        createPage: {
          floatWindow: action.payload.floatWindow,
        },
      }))

    case CREATE_TRIP_SET_COVER_PIC:
      return state.setIn(['createPage', 'coverPic'], action.payload.img)

    case CREATE_TRIP_SET_TREE_PIC:
      return state.setIn(['createPage', 'treePic'], action.payload.imgs)

    default:
      return state
  }
}
