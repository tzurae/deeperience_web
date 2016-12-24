import { bindActionCreators } from 'redux'
import { Map } from 'immutable'

export default actions => dispatch => ({
  actions: bindActionCreators(Map()
      .merge(...actions)
      .filter(value => typeof value === 'function')
      .toObject(),
    dispatch),
})
