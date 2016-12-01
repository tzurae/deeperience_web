const {
  SET_API_ENGINE,
} =  require('../../constants/ActionTypes').default

export const setApiEngine = apiEngine => {
  return {
    type: SET_API_ENGINE,
    apiEngine,
  }
}
