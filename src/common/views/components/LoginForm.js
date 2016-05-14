import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
// import validator from 'validator';
import BsHorizontalForm from './BsHorizontalForm';
import BsFormInput from './BsFormInput';
import BsFormButton from './BsFormButton';
import userAPI from '../../api/user';
import { loginUser } from '../../actions/userActions';

const validate = (values) => {
  const errors = {};

  // if (values.email && !validator.isEmail(values.email)) {
  //   errors.email = 'Not an email';
  // }

  if (!values.email) {
    errors.email = 'Required';
  }

  if (!values.password) {
    errors.password = 'Required';
  }

  return errors;
};

class LoginForm extends Component {
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
          if (location && location.state && location.state.nextPathname) {
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
    const {
      fields: { email, password },
      handleSubmit,
    } = this.props;

    return (
      <BsHorizontalForm onSubmit={handleSubmit(this._handleSubmit)}>
        <BsFormInput
          label="Email"
          type="text"
          placeholder="Email"
          field={email}
        />
        <BsFormInput
          label="Password"
          type="password"
          placeholder="Password"
          field={password}
        />
        <BsFormButton
          type="submit"
          title="Login"
        />
      </BsHorizontalForm>
    );
  }
};

LoginForm.contextTypes = {
  store: React.PropTypes.object.isRequired,
  router: React.PropTypes.any.isRequired,
};

LoginForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'login',
  fields: [
    'email',
    'password',
  ],
  validate,
})(LoginForm);
