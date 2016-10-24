import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import userAPI from '../../../api/user';
import { logoutUser } from '../../../actions/userActions';

class LogoutPage extends React.Component {
  componentWillMount() {
    let { dispatch, apiEngine } = this.props;

    userAPI(apiEngine)
      .logout()
      .catch((err) => {
        alert('Logout user fail');
        throw err;
      })
      .then((json) => dispatch(logoutUser()))
      .then(() => dispatch(push('/')));
  }

  render() {
    return null;
  }
};

export default connect(state => ({
  apiEngine: state.apiEngine,
}))(LogoutPage);
