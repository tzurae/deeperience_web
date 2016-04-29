import React from 'react';
import userAPI from '../../../api/user';

export default class LogoutPage extends React.Component {
  static contextTypes = {
    router: React.PropTypes.any.isRequired,
  };

  componentWillMount() {
    userAPI
      .logout()
      .catch((err) => {
        alert('Logout user fail');
        throw err;
      })
      .then((json) => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.context.router.push('/');
      });
  }

  render() {
    return false;
  }
};