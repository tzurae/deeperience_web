import { fromJS } from 'immutable'

// const CreatePage = fromJS({
//   page: 1,
// })

const InitialState = fromJS({
  createPage: {
    page: 1,
  },
  ownSites: [],
  tripInfo: [],
  routes: [],
  startSites: [],
  uuid2data: {},
  error: null,
})

export default InitialState
