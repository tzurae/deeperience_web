import React from 'react';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import userAPI from '../../../api/user';

export default class RegisterPage extends React.Component {
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
      .register({
        name: this.refs.name.getValue(),
        email: this.refs.email.getValue(),
        password: this.refs.password.getValue(),
      })
      .catch((err) => {
        alert('Register user fail');
        throw err;
      })
      .then((json) => {
        this.context.router.push('/');
      });
  }

  render() {
    return <div className="container">
      <PageHeader title="Register" />

      <form
        className="form-horizontal"
        onSubmit={this._handleSubmit}>

        <Input
          ref="name"
          label="Name"
          placeholder="name" />

        <Input
          ref="email"
          label="Email*"
          placeholder="email" />

        <Input
          ref="password"
          label="Password*"
          type="password"
          placeholder="password" />

        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button type="submit" className="btn btn-default">Register</button>
          </div>
        </div>
      </form>
    </div>;
  }
};