import { Record } from 'immutable'

const InitialState = Record({
  ownSites: [],
  tripInfo: [],
  routes: [],
  startSites: [],
  uuid2data: {},
  error: null,
})

export default InitialState
