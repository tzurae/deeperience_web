import { Record } from 'immutable'

const CreatePage = Record({
  page: 1,
})

const InitialState = Record({
  createPage: new CreatePage(),
  ownSites: [],
  tripInfo: [],
  routes: [],
  startSites: [],
  uuid2data: {},
  error: null,
})

export default InitialState
