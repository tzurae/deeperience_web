import React from 'react';
import PageLayout from '../../layouts/PageLayout';
import BsPageHeader from '../../components/BsPageHeader';
import LoginForm from '../../components/LoginForm';
import userAPI from '../../../api/user';
import { loginUser } from '../../../actions/userActions';

export default class LoginPage extends React.Component {
  static contextTypes = {
    store: React.PropTypes.object.isRequired,
    router: React.PropTypes.any.isRequired,
  };

  constructor(props) {
    super(props);
    this._login = ::this._login;
    this._handleSubmit = ::this._handleSubmit;
  }

  _login(json) {
    this.context.store.dispatch(loginUser({
      token: json.token,
      data: json.user,
    }));
  }

  _handleSubmit(formData) {
    userAPI
      .login(formData)
      .catch((err) => {
        alert('Login user fail');
        throw err;
      })
      .then((json) => {
        if (json.isAuth) {
          this._login(json);
          // redirect to the origin path before logging in
          const { location } = this.props;
          if (location.state && location.state.nextPathname) {
            this.context.router.push(location.state.nextPathname);
          } else {
            this.context.router.push('/');
          }
        } else {
          alert('wrong email or password');
        }
      });
  }

  render() {
    return (
      <PageLayout>
        <BsPageHeader title="Login" />
        <LoginForm onSubmit={this._handleSubmit} />
      </PageLayout>
    );
  }
};
