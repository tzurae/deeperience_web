import ActionTypes from '../constants/ActionTypes'

export const setOwnSite = (sites) => {
  return {
    type: ActionTypes.SET_OWN_SITE,
    payload: sites,
  }
}
