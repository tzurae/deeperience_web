import { fromJS } from 'immutable'

const CreatePage = fromJS({
  page: 0,
  done: new Array(...{ length: 5 }).map(() => false),
})

const InitialState = fromJS({
  createPage: CreatePage,
  error: null,
})

export default InitialState
