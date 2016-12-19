import uuid from 'uuid'
import { fromJS, List } from 'immutable'

const {
  SET_OWN_SITE,
  SET_CREATE_TRIP_DATA,
  RESET_CREATE_TRIP_DATA,
  CREATE_TRIP_ERROR,
  CREATE_TRIP_NEXT_PAGE,
  CREATE_TRIP_PREVIOUS_PAGE,
  CREATE_TRIP_SET_PAGE,
  CREATE_TRIP_SET_DONE,
} = require('../../constants/ActionTypes').default

const initialState = fromJS({
  createPage: {
    page: 0,
    done: new Array(...{ length: 5 }).map(() => false),
  },
  ownSites: [],
  tripInfo: [],
  routes: [],
  startSites: [],
  uuid2data: {},
  error: '',
})

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_OWN_SITE:
      return state.set('ownSites', action.payload.sites)

    case SET_CREATE_TRIP_DATA:
      const { tripInfo, routes, startSites, uuid2data } = action.payload
      return state.set('tripInfo', tripInfo || state.get('tripInfo'))
                  .set('routes', routes || state.get('routes'))
                  .set('startSites', startSites || state.get('startSites'))
                  .set('uuid2data', uuid2data || state.get('uuid2data'))

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
      return initialState.set('ownSites', state.get('ownSites'))
        .set('tripInfo', tripInfo)
        .set('routes', routes)
        .set('startSites', startSites)
        .set('uuid2data', uuid2data)
    }
    case CREATE_TRIP_ERROR:
      return state.set('error', action.payload.error)

    case CREATE_TRIP_NEXT_PAGE:
      return state.setIn(['createPage', 'page'], state.getIn(['createPage', 'page']) + 1)

    case CREATE_TRIP_PREVIOUS_PAGE:
      return state.setIn(['createPage', 'page'], state.getIn(['createPage', 'page']) - 1)

    case CREATE_TRIP_SET_PAGE:
      return state.setIn(['createPage', 'page'], action.payload.page)

    case CREATE_TRIP_SET_DONE:
      return state.setIn(['createPage', 'done'], action.payload.done)

    default:
      return state
  }
}
