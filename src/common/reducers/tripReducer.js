import ActionTypes from '../constants/ActionTypes'
import uuid from 'uuid'

const uid = uuid()
const initialState = {
  ownSites: [],
  tripInfo: [{
    ylayer: [1],
    sites: [{
      pos: { xpos: 0, ypos: 0 },
      uuid: uid,
    }],
    routes: [],
  }],
  routes: [[]],
  startSites: [uid],
  uuid2data: {
    [uid]: {
      gid: '',
    },
  },
  error: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_OWN_SITE:
      return {
        ...state,
        ownSites: action.payload,
      }
    case ActionTypes.SET_CREATE_TRIP_DATA:
      return {
        ...state,
        tripInfo: action.payload.tripInfo || state.tripInfo,
        routes: action.payload.routes || state.routes,
        startSites: action.payload.startSites || state.startSites,
      }
    case ActionTypes.RESET_CREATE_TRIP_DATA:
      const uid = uuid()
      return {
        ...state,
        tripInfo: [{
          ylayer: [1],
          sites: [{
            pos: { xpos: 0, ypos: 0 },
            uuid: uid,
          }],
          routes: [],
        }],
        routes: [[]],
        startSites: [uid],
        uuid2data: {
          [uid]: {
            gid: '',
          },
        },
      }
    case ActionTypes.CREATE_TRIP_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
}
