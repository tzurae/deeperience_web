import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import userAPI from '../../api/user'
import * as authAction from '../../reducers/auth/authAction'
import { createStructuredSelector } from 'reselect';
import { selectSomethingFromGlobal } from '../../lib/selector'

const mapStateToProps = createStructuredSelector({
  apiEngine: selectSomethingFromGlobal('apiEngine')
})

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(authAction, dispatch)
  }
}

class LogoutPage extends React.Component {

  componentWillMount() {
    const { actions, apiEngine } = this.props
    userAPI(apiEngine)
      .logout()
      .catch((err) => {
        alert('Logout user fail')
        throw err
      })
      .then(() => actions.logout())
  }

  render() {
    return null
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LogoutPage)
