import React from 'react'
import { connect } from 'react-redux'
import mapDispatchToProps from '../../lib/mapDispatchToProps'
import * as authActions from '../../reducers/auth/authActions'

@connect(
  null,
  mapDispatchToProps([authActions])
)

class LogoutPage extends React.Component {

  componentWillMount() {
    this.props.actions.logout()
  }

  render() {
    return null
  }
};

export default LogoutPage
