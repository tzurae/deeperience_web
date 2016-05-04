import React from 'react';
import reactCookie from 'react-cookie';
import userAPI from '../../../api/user';

export default class LogoutPage extends React.Component {
  static contextTypes = {
    router: React.PropTypes.any.isRequired,
  };

  constructor(props) {
    super(props);
    this._logout = ::this._logout;
  }

  _logout() {
    reactCookie.remove('token');
    reactCookie.remove('user');
  }

  componentWillMount() {
    userAPI
      .logout()
      .catch((err) => {
        alert('Logout user fail');
        throw err;
      })
      .then((json) => {
        this._logout();
        this.context.router.push('/');
      });
  }

  render() {
    return false;
  }
};