import React from 'react';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import userAPI from '../../../api/user';

export default class LoginPage extends React.Component {
  static contextTypes = {
    router: React.PropTypes.any.isRequired,
  };

  constructor(props) {
    super(props);
    this._handleSubmit = ::this._handleSubmit;
  }

  _handleSubmit(e) {
    e.preventDefault();
    userAPI
      .login({
        email: this.refs.email.getValue(),
        password: this.refs.password.getValue(),
      })
      .catch((err) => {
        alert('Login user fail');
        throw err;
      })
      .then((json) => {
        if (json.isAuth) {
          localStorage.setItem('token', json.token);
          localStorage.setItem('user', JSON.stringify(json.user));

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
    return <div className="container">
      <PageHeader title="Login" />

      <form
        className="form-horizontal"
        onSubmit={this._handleSubmit}>

        <Input
          ref="email"
          label="Email"
          placeholder="email" />

        <Input
          ref="password"
          label="Password"
          type="password"
          placeholder="password" />

        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button type="submit" className="btn btn-default">Login</button>
          </div>
        </div>
      </form>
    </div>;
  }
};