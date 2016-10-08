import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
// import validator from 'validator';
import { pushErrors } from '../../actions//errorActions';
import { loginUser } from '../../actions/userActions';
import Form from '../main/Form';
import Input from '../reduxForm/Input';
import userAPI from '../../api/user';

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
    this._login = this._login.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _login(json) {
    return this.context.store.dispatch(loginUser({
      token: json.token,
      data: json.user,
    }));
  }

  _handleSubmit(formData) {
    userAPI(this.context.store.getState().apiEngine)
      .login(formData)
      .catch((err) => {
        this.context.store.dispatch(pushErrors(err));
        throw err;
      })
      .then((json) => {
        if (json.isAuth) {
          this._login(json).then(() => {
            // redirect to the origin path before logging in
            const { location } = this.props;
            if (location && location.state && location.state.nextPathname) {
              this.context.router.push(location.state.nextPathname);
            } else {
              this.context.router.push('/');
            }
          });
        } else {
          this.context.store.dispatch(pushErrors([{
            title: 'User Not Exists',
            detail: 'You may type wrong email or password.',
          }]));
        }
      });
  }

  render() {
    const {
      fields: { email, password },
      handleSubmit,
    } = this.props;

    return (
      <Form horizontal onSubmit={handleSubmit(this._handleSubmit)}>
        <Input
          title="Email"
          type="text"
          placeholder="Email"
          field={email}
        />
        <Input
          title="Password"
          type="password"
          placeholder="Password"
          field={password}
        />
        <Form.Button
          type="submit"
          title="Login"
        />
      </Form>
    );
  }
};

LoginForm.contextTypes = {
  store: PropTypes.object.isRequired,
  router: PropTypes.any.isRequired,
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
