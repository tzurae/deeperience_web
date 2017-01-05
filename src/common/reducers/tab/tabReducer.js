import { fromJS } from 'immutable'
import createReducer from '../../lib/configureReducer'

const {
  TAB_CHANGE
} = require('../../constants/ActionTypes').default

const initialState = fromJS({
  memberCenter: {
    active: 0,
    tabText: [],
  },
  CreateSite: {
    active: 0,
    tabText: [
      'nav.trip.createSite',
      'nav.trip.manageSite',
      'nav.trip.createTrip',
      'nav.trip.manageTrip',
      'nav.trip.myOrder',
    ],
    tabLink: [
      '/site/create',
      '#',
      '/trip/create',
      '#',
      '/order/list'
    ]
  }
})

export default createReducer(initialState, {
  [TAB_CHANGE](state,action) {
    console.log('active key is', action.active);
    return state.setIn(['CreateSite','active'], action.active)
  }
})


