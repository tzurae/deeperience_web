import React from 'react';
import { connect } from 'react-redux';
import reactCookie from 'react-cookie';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import userAPI from '../../../api/user';
import { loginUser } from '../../../actions/userActions';

@connect(state => state)
export default class LoginPage extends React.Component {
  static contextTypes = {
    router: React.PropTypes.any.isRequired,
  };

  constructor(props) {
    super(props);
    this._login = ::this._login;
    this._handleSubmit = ::this._handleSubmit;
  }

  _login(json) {
    this.props.dispatch(loginUser({
      token: json.token,
      data: json.user,
    }));
    reactCookie.save('token',  json.token);
    reactCookie.save('user',  json.user);
  }

  _handleSubmit(e) {
    e.preventDefault();
    userAPI
      .login({
        email: this.inputEmail.getValue(),
        password: this.inputPassword.getValue(),
      })
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
    return <div className="container">
      <PageHeader title="Login" />

      <form
        className="form-horizontal"
        onSubmit={this._handleSubmit}>

        <Input
          ref={input => this.inputEmail = input}
          label="Email"
          placeholder="email" />

        <Input
          ref={input => this.inputPassword = input}
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