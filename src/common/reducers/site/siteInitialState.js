import { Record } from 'immutable'

const CreatePage = Record({
  page: 0,
  done: new Array(...{ length: 5 }).map(() => false),
})

const InitialState = Record({
  createPage: new CreatePage(),
  error: null,
})

export default InitialState
