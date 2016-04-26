import React from 'react';
import userAPI from '../../../api/user';

export default class LogoutPage extends React.Component {
  static contextTypes = {
    router: React.PropTypes.any.isRequired,
  };

  componentWillMount() {
    userAPI
      .logout()
      .then((json) => {
        if (json.isError) {
          console.log(json.errors);
          alert('Logout fail');
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          this.context.router.push('/');
        }
      });
  }

  render() {
    return false;
  }
};