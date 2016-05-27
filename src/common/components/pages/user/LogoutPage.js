import React from 'react';
import userAPI from '../../../api/user';
import { logoutUser } from '../../../actions/userActions';

export default class LogoutPage extends React.Component {
  static contextTypes = {
    store: React.PropTypes.object.isRequired,
    router: React.PropTypes.any.isRequired,
  };

  constructor(props) {
    super(props);
    this._logout = ::this._logout;
  }

  _logout() {
    this.context.store.dispatch(logoutUser());
  }

  componentWillMount() {
    userAPI(this.context.store.getState().apiEngine)
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
    return null;
  }
};
