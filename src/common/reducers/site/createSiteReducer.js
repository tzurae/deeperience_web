import { Map } from 'immutable'

const {
  CREATE_SITE_NEXT_PAGE,
  CREATE_SITE_PREVIOUS_PAGE,
  CREATE_SITE_SET_PAGE,
} = require('../../constants/ActionTypes')

const inititialState = Map({
  page: 0,
})

export default (state = inititialState, action) => {
  switch (action.type) {
    case CREATE_SITE_NEXT_PAGE:
      return
        state.set('page', state.page + 1)
      // {
      //   ...state,
      //   page: state.page + 1,
      // }
    case CREATE_SITE_PREVIOUS_PAGE:
      return
        state.set('page', state.page -1)
    // {
    //     ...state,
    //     page: state.page - 1,
    //   }
    case CREATE_SITE_SET_PAGE:
      return
        state.set('page', action.payload)
    // {
    //     ...state,
    //     page: action.payload,
    //   }
    default:
      return state
  }
}
