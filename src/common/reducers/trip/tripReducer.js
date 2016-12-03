import InitialState from './tripInitialState'
import uuid from 'uuid'
const {
  SET_OWN_SITE,
  SET_CREATE_TRIP_DATA,
  RESET_CREATE_TRIP_DATA,
  CREATE_TRIP_ERROR,
} = require('../../constants/ActionTypes').default

const initialState = new InitialState()

export default (state = initialState, action) => {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state)

  switch (action.type) {
    case SET_OWN_SITE:
      return state.set('ownSites', action.payload)

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
      return new InitialState().set('ownSites', state.get('ownSites'))
        .set('tripInfo', tripInfo)
        .set('routes', routes)
        .set('startSites', startSites)
        .set('uuid2data', uuid2data)
    }
    case CREATE_TRIP_ERROR:
      return state.set('error', action.payload)

    default:
      return state
  }
}